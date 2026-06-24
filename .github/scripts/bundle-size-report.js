'use strict';

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(process.cwd(), 'apps/timo-web/.next');

const formatBytes = (bytes) => {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} kB`;
  return `${bytes} B`;
};

const toKb = (bytes) => bytes / 1024;

const safeStatSize = (filePath) => {
  try { return fs.statSync(filePath).size; } catch { return 0; }
};

const readJson = (filePath) => {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch { return null; }
};

const sumDirSize = (dirPath) => {
  if (!fs.existsSync(dirPath)) return 0;
  return fs.readdirSync(dirPath).reduce((sum, file) => {
    const full = path.join(dirPath, file);
    const stat = fs.statSync(full);
    return sum + (stat.isFile() ? stat.size : 0);
  }, 0);
};

const analyzeBuild = (buildDir) => {
  if (!fs.existsSync(buildDir)) return { routes: [], sharedSize: null };

  const buildManifest = readJson(path.join(buildDir, 'build-manifest.json'));
  const routesManifest = readJson(path.join(buildDir, 'routes-manifest.json'));
  // webpack 빌드에서만 생성됨
  const appBuildManifest = readJson(path.join(buildDir, 'app-build-manifest.json'));

  if (!buildManifest) return { routes: [], sharedSize: null };

  // 공유 번들 크기 (rootMainFiles)
  const rootMainFiles = buildManifest.rootMainFiles ?? [];
  const sharedBytes = rootMainFiles.reduce(
    (sum, chunk) => sum + safeStatSize(path.join(buildDir, chunk)),
    0
  );

  let routes = [];

  if (appBuildManifest) {
    // webpack 모드: app-build-manifest.json으로 라우트별 청크 매핑
    const pages = appBuildManifest.pages ?? {};
    routes = Object.entries(pages)
      .filter(([route]) => route !== '/_not-found')
      .map(([route, chunks]) => {
        const pageBytes = chunks.reduce(
          (sum, chunk) => sum + safeStatSize(path.join(buildDir, chunk)),
          0
        );
        const firstLoadBytes = pageBytes + sharedBytes;
        return {
          path: route,
          size: formatBytes(pageBytes),
          firstLoad: formatBytes(firstLoadBytes),
          firstLoadKb: toKb(firstLoadBytes),
        };
      });
  } else {
    // Turbopack 모드: routes-manifest.json으로 라우트 목록 구성
    // 라우트별 클라이언트 청크는 static/chunks/app/ 하위에서 탐색
    const staticRoutes = [
      ...(routesManifest?.staticRoutes ?? []),
      ...(routesManifest?.dynamicRoutes ?? []),
    ];

    const appChunksDir = path.join(buildDir, 'static', 'chunks', 'app');

    routes = staticRoutes
      .filter(({ page }) => page !== '/_not-found')
      .map(({ page }) => {
        // static/chunks/app/[page-segment]/ 디렉토리 크기를 페이지 크기로 사용
        const segment = page === '/' ? '' : page;
        const pageChunkDir = path.join(appChunksDir, segment);
        const pageBytes = sumDirSize(pageChunkDir);

        const firstLoadBytes = pageBytes + sharedBytes;
        return {
          path: page,
          size: formatBytes(pageBytes),
          firstLoad: formatBytes(firstLoadBytes),
          firstLoadKb: toKb(firstLoadBytes),
        };
      });

    // 라우트가 없으면 공유 번들만이라도 / 라우트로 표시
    if (routes.length === 0 && sharedBytes > 0) {
      routes = [{
        path: '/',
        size: '0 B',
        firstLoad: formatBytes(sharedBytes),
        firstLoadKb: toKb(sharedBytes),
      }];
    }
  }

  return { routes, sharedSize: formatBytes(sharedBytes) };
};

const WARN_THRESHOLD_KB = 200;
const ERROR_THRESHOLD_KB = 350;

const sizeIcon = (firstLoadKb) => {
  if (firstLoadKb >= ERROR_THRESHOLD_KB) return '🔴';
  if (firstLoadKb >= WARN_THRESHOLD_KB) return '🟡';
  return '🟢';
};

const formatRouteTable = (appLabel, { routes, sharedSize }) => {
  if (!routes.length) {
    return `### ${appLabel}\n\n> ⚠️ 번들 크기 데이터를 가져오지 못했습니다 (.next 디렉토리를 확인하세요).\n`;
  }

  const rows = routes
    .map(
      (r) =>
        `| \`${r.path}\` | ${r.size} | ${r.firstLoad} | ${sizeIcon(r.firstLoadKb)} |`
    )
    .join('\n');

  const sharedLine = sharedSize ? `\n> 공유 번들: **${sharedSize}**\n` : '';

  return `### ${appLabel}

| 라우트 | 크기 | First Load JS | 상태 |
|--------|------|---------------|------|
${rows}
${sharedLine}`;
};

module.exports = async ({ github, context, core }) => {
  const prNumber = context.payload.pull_request?.number;
  if (!prNumber) {
    core.warning('PR 컨텍스트를 찾을 수 없습니다.');
    return;
  }

  const { owner, repo } = context.repo;

  core.info(`번들 분석 경로: ${BUILD_DIR}`);
  const timoWebBuild = analyzeBuild(BUILD_DIR);

  if (!timoWebBuild.routes.length) {
    core.warning(`번들 크기 데이터를 파싱하지 못했습니다. ${BUILD_DIR} 를 확인하세요.`);
    return;
  }

  const legend = `> 🟢 정상 (<${WARN_THRESHOLD_KB}kB)  🟡 주의 (<${ERROR_THRESHOLD_KB}kB)  🔴 초과 (≥${ERROR_THRESHOLD_KB}kB) — First Load JS 기준 (비압축 크기)`;

  const body = `## 📦 번들 사이즈 리포트

${formatRouteTable('🕐 Timo Web', timoWebBuild)}

---

${legend}

*빌드 커밋: \`${context.sha.slice(0, 7)}\`*`;

  const { data: comments } = await github.rest.issues.listComments({
    owner,
    repo,
    issue_number: prNumber,
  });

  for (const comment of comments) {
    if (
      comment.user?.type === 'Bot' &&
      comment.body?.includes('번들 사이즈 리포트')
    ) {
      await github.rest.issues.deleteComment({
        owner,
        repo,
        comment_id: comment.id,
      });
    }
  }

  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body,
  });

  core.info('번들 사이즈 리포트 PR 코멘트 게시 완료');
};
