'use strict';

const fs = require('fs');

/**
 * Next.js 빌드 출력에서 라우트별 번들 크기를 파싱합니다.
 * turbo run 출력 형식 (앱명:build: 접두사 포함/미포함 모두 처리)
 */
const parseBuildOutput = (rawOutput) => {
  const output = rawOutput
    .split('\n')
    .map((line) => line.replace(/\x1b\[[0-9;]*m/g, ''))
    .map((line) => line.replace(/^[^\s]+:build:\s?/, ''))
    .join('\n');

  const routes = [];
  const routeRegex =
    /[┌├└│]\s+[○●λ◑ƒ]\s+(\/\S*)\s+([\d.]+\s*[kMGT]?B)\s+([\d.]+\s*[kMGT]?B)/g;

  let match;
  while ((match = routeRegex.exec(output)) !== null) {
    routes.push({
      path: match[1],
      size: match[2].trim(),
      firstLoad: match[3].trim(),
    });
  }

  const sharedMatch = output.match(
    /First Load JS shared by all\s+([\d.]+\s*[kMGT]?B)/
  );

  return { routes, sharedSize: sharedMatch?.[1]?.trim() ?? null };
};

/**
 * First Load JS 크기 문자열을 kB 단위 숫자로 변환합니다.
 */
const toKb = (sizeStr) => {
  const match = sizeStr.match(/([\d.]+)\s*([kMG]?B)/);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2];
  if (unit === 'MB') return value * 1024;
  if (unit === 'kB') return value;
  return value / 1024;
};

const WARN_THRESHOLD_KB = 200;
const ERROR_THRESHOLD_KB = 350;

const sizeIcon = (firstLoadStr) => {
  const kb = toKb(firstLoadStr);
  if (kb >= ERROR_THRESHOLD_KB) return '🔴';
  if (kb >= WARN_THRESHOLD_KB) return '🟡';
  return '🟢';
};

const formatRouteTable = (appLabel, { routes, sharedSize }) => {
  if (!routes.length) {
    return `### ${appLabel}\n\n> ⚠️ 빌드 출력을 파싱하지 못했습니다.\n`;
  }

  const rows = routes
    .map(
      (r) =>
        `| \`${r.path}\` | ${r.size} | ${r.firstLoad} | ${sizeIcon(r.firstLoad)} |`
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

  const readBuild = (filePath) => {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch {
      return '';
    }
  };

  const timoWebBuild = parseBuildOutput(readBuild('/tmp/timo-web-build.txt'));

  if (!timoWebBuild.routes.length) {
    core.warning('번들 크기 데이터를 파싱하지 못했습니다. 빌드 출력을 확인하세요.');
    return;
  }

  const legend = `> 🟢 정상 (<${WARN_THRESHOLD_KB}kB)  🟡 주의 (<${ERROR_THRESHOLD_KB}kB)  🔴 초과 (≥${ERROR_THRESHOLD_KB}kB) — First Load JS 기준`;

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
