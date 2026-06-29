import fs from "fs";
import path from "path";

const spritePath = path.resolve(process.cwd(), "public/sprite.svg");
let cachedSprite: string | null | undefined;

export const SvgSprite = () => {
  if (cachedSprite === undefined) {
    cachedSprite = fs.existsSync(spritePath)
      ? fs.readFileSync(spritePath, "utf-8")
      : null;
  }

  if (!cachedSprite) return null;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: cachedSprite }}
      style={{ display: "none" }}
    />
  );
};
