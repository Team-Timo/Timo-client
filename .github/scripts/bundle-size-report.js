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

const analyzeBuild = (buildDir) => {
  if (!fs.existsSync(buildDir)) return { routes: [], sharedSize: null };

  const appBuildManifest = readJson(path.join(buildDir, 'app-build-manifest.json'));
  const buildManifest = readJson(path.join(buildDir, 'build-manifest.json'));

  if (!appBuildManifest && !buildManifest) return { routes: [], sharedSize: null };

  // rootMainFiles 경로는 .next/ 기준 상대 경로
  const rootMainFiles = buildManifest?.rootMainFiles ?? [];
  const sharedBytes = rootMainFiles.reduce(
    (sum, chunk) => sum + safeStatSize(path.join(buildDir, chunk)),
    0
  );

  const pages = appBuildManifest?.pages ?? {};
  const routes = Object.entries(pages)
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
