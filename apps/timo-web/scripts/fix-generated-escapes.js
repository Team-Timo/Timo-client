import fs from "fs";
import process from "node:process";

const files = process.argv.slice(2);

for (const filePath of files) {
  const content = fs.readFileSync(filePath, "utf8");
  const fixed = content.split("\\/").join("/");

  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed);
  }
}
