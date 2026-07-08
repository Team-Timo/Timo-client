'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ─── Utilities ────────────────────────────────────────────────────────────────

const readJson = (filePath) => {
  if (!filePath || !fs.existsSync(filePath)) return null;
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
  catch { return null; }
};

const gzipSize = (filePath) => {
  try { return zlib.gzipSync(fs.readFileSync(filePath)).length; }
  catch { return 0; }
};

const formatBytes = (bytes) => {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} kB`;
  return `${bytes} B`;
};

// ─── Bundle ───────────────────────────────────────────────────────────────────

const BUILD_DIR = path.join(process.cwd(), 'apps/timo-web/.next');
const INTERNAL_ROUTES = new Set(['/_not-found', '/_global-error']);
const BUNDLE_WARN_KB = 200;
const BUNDLE_ERROR_KB = 350;

const PROJECT_MODULE_PREFIX = '[project]/apps/timo-web/app';

const extractClientReferenceManifest = (jsFilePath) => {
  if (!jsFilePath || !fs.existsSync(jsFilePath)) return null;
  try {
    const content = fs.readFileSync(jsFilePath, 'utf8');
    const match = content.match(/"\]\s*=\s*(\{[\s\S]*\});\s*$/);
    return match ? JSON.parse(match[1]) : null;
  } catch {
    return null;
  }
};

const stripRouteGroups = (routePath) =>
  routePath
    .split('/')
    .filter((segment) => !(segment.startsWith('(') && segment.endsWith(')')))
    .join('/') || '/';

// Turbopack (Next.js 16's default bundler) does not emit `app-build-manifest.json`
// or `static/chunks/app/<route>/`, so per-route sizes come from each route's
// `page_client-reference-manifest.js` (entryJSFiles already accumulates the page's
// own chunk plus every parent layout chunk, deduped against the shared root chunks).
const analyzeBundle = () => {
  const buildManifest = readJson(path.join(BUILD_DIR, 'build-manifest.json'));
  const appPathsManifest = readJson(path.join(BUILD_DIR, 'server', 'app-paths-manifest.json'));
  if (!buildManifest || !appPathsManifest) return null;

  const sharedFiles = new Set(buildManifest.rootMainFiles ?? []);
  const sharedBytes = [...sharedFiles].reduce((sum, chunk) => sum + gzipSize(path.join(BUILD_DIR, chunk)), 0);

  const routes = Object.entries(appPathsManifest)
    .filter(([entryKey]) => !INTERNAL_ROUTES.has(entryKey.replace(/\/page$/, '')))
    .map(([entryKey, relPath]) => {
      const routePath = stripRouteGroups(entryKey.replace(/\/page$/, ''));
      const manifestPath = path.join(BUILD_DIR, 'server', relPath.replace(/\.js$/, '_client-reference-manifest.js'));
      const manifest = extractClientReferenceManifest(manifestPath);
      const pageFiles = (manifest?.entryJSFiles?.[`${PROJECT_MODULE_PREFIX}${entryKey}`] ?? [])
        .filter((file) => !sharedFiles.has(file));
      const pageBytes = pageFiles.reduce((sum, file) => sum + gzipSize(path.join(BUILD_DIR, file)), 0);
      const firstLoad = pageBytes + sharedBytes;
      return { path: routePath, size: formatBytes(pageBytes), firstLoad: formatBytes(firstLoad), firstLoadKb: firstLoad / 1024 };
    });

  return { routes, sharedSize: formatBytes(sharedBytes) };
};

const renderBundle = (data) => {
  const wrap = (content) => `<details>\n<summary>Bundle Size — timo-web</summary>\n${content}\n</details>`;

  if (!data?.routes?.length) return wrap('\n> ⚠️ 번들 데이터를 가져오지 못했습니다.\n');

  const rows = data.routes.map(({ path: p, size, firstLoad, firstLoadKb }) => {
    const icon = firstLoadKb >= BUNDLE_ERROR_KB ? '🔴' : firstLoadKb >= BUNDLE_WARN_KB ? '🟡' : '🟢';
    return `| \`${p}\` | ${size} | ${icon} ${firstLoad} |`;
  }).join('\n');

  return wrap(`
| 라우트 | 크기 | First Load JS |
|--------|-----:|:-------------|
${rows}

> 공유 번들: **${data.sharedSize}**
> 🟢 < ${BUNDLE_WARN_KB}kB &nbsp;|&nbsp; 🟡 < ${BUNDLE_ERROR_KB}kB &nbsp;|&nbsp; 🔴 ≥ ${BUNDLE_ERROR_KB}kB (First Load JS · gzip)
`);
};

// ─── Lighthouse ───────────────────────────────────────────────────────────────

const LHCI_DIR = path.join(process.cwd(), '.lighthouseci');

const analyzeLighthouse = () => {
  const manifest = readJson(path.join(LHCI_DIR, 'manifest.json'));
  if (!manifest) return null;

  return manifest
    .filter((r) => r.isRepresentativeRun && r.summary)
    .map(({ url, summary, jsonPath }) => {
      let pathname;
      try { pathname = new URL(url).pathname || '/'; }
      catch { pathname = url; }

      const audits = readJson(jsonPath)?.audits ?? {};
      return {
        pathname,
        perf: summary.performance,
        a11y: summary.accessibility,
        lcp: audits['largest-contentful-paint']?.numericValue,
        cls: audits['cumulative-layout-shift']?.numericValue,
        tbt: audits['total-blocking-time']?.numericValue,
      };
    });
};

const fmtScore = (v, threshold) => {
  const icon = v >= threshold + 0.1 ? '🟢' : v >= threshold ? '🟡' : '🔴';
  return `${icon} ${Math.round(v * 100)}`;
};

const renderLighthouse = (data) => {
  const wrap = (content) => `<details>\n<summary>Lighthouse — timo-web</summary>\n${content}\n</details>`;

  if (!data?.length) return wrap('\n> ⚠️ Lighthouse 결과를 가져오지 못했습니다.\n');

  const rows = data.map(({ pathname, perf, a11y, lcp, cls, tbt }) => {
    const lcpFmt = lcp != null ? `${lcp < 2500 ? '🟢' : lcp < 4000 ? '🟡' : '🔴'} ${(lcp / 1000).toFixed(1)}s` : '-';
    const clsFmt = cls != null ? `${cls < 0.1 ? '🟢' : cls < 0.25 ? '🟡' : '🔴'} ${cls.toFixed(3)}` : '-';
    const tbtFmt = tbt != null ? `${tbt < 200 ? '🟢' : tbt < 600 ? '🟡' : '🔴'} ${Math.round(tbt)}ms` : '-';
    return `| \`${pathname}\` | ${fmtScore(perf, 0.7)} | ${fmtScore(a11y, 0.85)} | ${lcpFmt} | ${clsFmt} | ${tbtFmt} |`;
  }).join('\n');

  return wrap(`
| URL | Perf | A11y | LCP | CLS | TBT |
|-----|:----:|:----:|----:|----:|----:|
${rows}

> **Perf** ≥ 70 / **A11y** ≥ 85 목표
> **LCP** 🟢 < 2.5s 🟡 < 4s 🔴 ≥ 4s &nbsp;|&nbsp; **CLS** 🟢 < 0.1 🟡 < 0.25 🔴 ≥ 0.25 &nbsp;|&nbsp; **TBT** 🟢 < 200ms 🟡 < 600ms 🔴 ≥ 600ms
`);
};

// ─── Images ───────────────────────────────────────────────────────────────────

const PUBLIC_DIR = path.join(process.cwd(), 'apps/timo-web/public');
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg', '.bmp', '.tiff']);
const MODERN_EXTS = new Set(['.webp', '.avif', '.svg']);
const IMG_WARN = 200 * 1024;
const IMG_ERROR = 500 * 1024;

const scanImages = (dir, base = dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap((file) => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) return scanImages(full, base);
    const ext = path.extname(file).toLowerCase();
    if (!IMAGE_EXTS.has(ext)) return [];
    return [{ rel: path.relative(base, full), bytes: fs.statSync(full).size, ext }];
  });
};

const analyzeImages = () => {
  const images = scanImages(PUBLIC_DIR);
  return images.length > 0 ? images : null;
};

const renderImages = (data) => {
  const wrap = (content) => `<details>\n<summary>Image Optimization — timo-web</summary>\n${content}\n</details>`;

  if (!data) return wrap('\n> public/ 디렉토리에 이미지가 없습니다.\n');

  const rows = data.map(({ rel, bytes, ext }) => {
    const sizeIcon = bytes >= IMG_ERROR ? '🔴' : bytes >= IMG_WARN ? '🟡' : '🟢';
    const fmtBadge = MODERN_EXTS.has(ext) ? '✅' : '⚠️';
    return `| \`${rel}\` | ${formatBytes(bytes)} | ${ext.slice(1).toUpperCase()} ${fmtBadge} | ${sizeIcon} |`;
  }).join('\n');

  const total = formatBytes(data.reduce((s, i) => s + i.bytes, 0));
  const nonModern = data.filter((i) => !MODERN_EXTS.has(i.ext)).length;
  const formatNote = nonModern > 0
    ? `⚠️ ${nonModern}개 파일 WebP/AVIF 변환 권장`
    : '✅ 모든 이미지가 최적화된 포맷';

  return wrap(`
| 파일 | 크기 | 포맷 | 상태 |
|------|-----:|:----:|:----:|
${rows}

> 총 ${data.length}개 · ${total} &nbsp;|&nbsp; 🟢 < 200KB &nbsp;|&nbsp; 🟡 < 500KB &nbsp;|&nbsp; 🔴 ≥ 500KB
> ${formatNote}
`);
};

// ─── Main ─────────────────────────────────────────────────────────────────────

const COMMENT_MARKER = '<!-- performance-report -->';

module.exports = async ({ github, context, core }) => {
  const prNumber = context.payload.pull_request?.number;
  if (!prNumber) { core.warning('PR 컨텍스트를 찾을 수 없습니다.'); return; }

  const { owner, repo } = context.repo;

  const body = [
    COMMENT_MARKER,
    '## Timo Performance Report',
    '',
    renderBundle(analyzeBundle()),
    '',
    renderLighthouse(analyzeLighthouse()),
    '',
    renderImages(analyzeImages()),
    '',
    `*측정 커밋: \`${context.sha.slice(0, 7)}\`*`,
  ].join('\n');

  const { data: comments } = await github.rest.issues.listComments({ owner, repo, issue_number: prNumber });
  const existing = comments.find((c) => c.user?.type === 'Bot' && c.body?.includes(COMMENT_MARKER));

  if (existing) {
    await github.rest.issues.updateComment({ owner, repo, comment_id: existing.id, body });
    core.info('성능 리포트 업데이트 완료');
  } else {
    await github.rest.issues.createComment({ owner, repo, issue_number: prNumber, body });
    core.info('성능 리포트 게시 완료');
  }
};
