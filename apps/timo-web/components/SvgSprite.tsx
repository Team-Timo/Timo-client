import fs from "fs";
import path from "path";

export const SvgSprite = () => {
  const spritePath = path.resolve(process.cwd(), "public/sprite.svg");

  if (!fs.existsSync(spritePath)) return null;

  const sprite = fs.readFileSync(spritePath, "utf-8");

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sprite }}
      style={{ display: "none" }}
    />
  );
};
