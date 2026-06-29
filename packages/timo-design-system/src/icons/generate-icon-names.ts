import fs from "fs";
import path from "path";

const sourceDir = path.resolve(process.cwd(), "src/icons/source");
const outputFile = path.resolve(process.cwd(), "src/icons/iconNames.ts");

const names = fs
  .readdirSync(sourceDir)
  .filter((f) => f.endsWith(".svg"))
  .map((f) => path.basename(f, ".svg"));

const content = `// auto-generated
export type IconName =\n  | ${names.map((n) => `'${n}'`).join("\n  | ")};\n`;

fs.writeFileSync(outputFile, content);
console.log("✅ iconNames.ts 생성 완료");
