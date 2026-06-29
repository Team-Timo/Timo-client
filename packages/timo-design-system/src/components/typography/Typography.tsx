import { TypographyToken } from "../../tokens/typography-token";

export const Typography = ({
  token,
  size,
  weight,
  lineHeight,
  letterSpacing,
}: TypographyToken) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "24px",
        padding: "16px 0",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div className={token} style={{ minWidth: "200px", color: "#171717" }}>
        계획 실행의 과정을 함께하는 Timo
      </div>
      <div>
        <div
          style={{ fontSize: "12px", color: "#666", fontFamily: "monospace" }}
        >
          {token}
        </div>
        <div style={{ fontSize: "12px", color: "#888" }}>
          {size} / {weight} / {lineHeight} / {letterSpacing}
        </div>
      </div>
    </div>
  );
};
