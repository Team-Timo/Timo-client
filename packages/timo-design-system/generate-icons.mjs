import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const toPascalCase = (str) =>
  str
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());

const outputDir = path.join(__dirname, "src/icons/generated");
const barrelFile = path.join(__dirname, "src/icons/index.ts");

if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true });
}
fs.mkdirSync(outputDir, { recursive: true });

execSync(
  `pnpm exec svgr --config-file svgr.config.mjs --no-index --out-dir src/icons/generated src/icons/source`,
  { cwd: __dirname, stdio: "inherit" },
);

const files = fs
  .readdirSync(outputDir)
  .filter((f) => f.endsWith(".tsx"))
  .sort();

const exports = files
  .map((f) => {
    const base = path.basename(f, ".tsx");
    return `export { ${toPascalCase(base)}Icon } from './generated/${base}';`;
  })
  .join("\n");

fs.writeFileSync(barrelFile, exports + "\n");

execSync(`pnpm prettier --write src/icons/generated src/icons/index.ts`, {
  cwd: __dirname,
  stdio: "inherit",
});

console.log(`✅ ${files.length}개 아이콘 생성 완료`);
