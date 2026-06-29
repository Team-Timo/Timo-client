import fs from "fs";
import path from "path";

import SVGSpriter from "svg-sprite";

const sourceDir = path.resolve(process.cwd(), "src/icons/source");
const outputDir = path.resolve(process.cwd(), "../../apps/timo-web/public");

const spriter = new SVGSpriter({
  dest: outputDir,
  mode: {
    symbol: {
      dest: ".",
      sprite: "sprite.svg",
    },
  },
  shape: {
    id: {
      separator: "",
      generator: (name: string) => `icon-${path.basename(name, ".svg")}`,
    },
  },
});

const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith(".svg"));

for (const file of files) {
  const filePath = path.join(sourceDir, file);
  spriter.add(filePath, file, fs.readFileSync(filePath, "utf-8"));
}

spriter.compile((error, result) => {
  if (error) throw error;

  for (const mode of Object.values(result)) {
    for (const resource of Object.values(
      mode as Record<string, { path: string; contents: Buffer }>,
    )) {
      fs.mkdirSync(path.dirname(resource.path), { recursive: true });
      fs.writeFileSync(resource.path, resource.contents);
    }
  }

  console.log("✅ sprite.svg 생성 완료");
});
