import fs from "fs";
import path from "path";

export const SvgSprite = () => {
  const sprite = fs.readFileSync(
    path.resolve(process.cwd(), "public/sprite.svg"),
    "utf-8",
  );

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sprite }}
      style={{ display: "none" }}
    />
  );
};
