import { TypographyToken } from "../../tokens/typography-token";

export const Typography = ({ token, size, weight, usage }: TypographyToken) => {
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
      <div
        style={{
          fontSize: size,
          fontWeight: weight,
          minWidth: "200px",
          color: "#171717",
        }}
      >
        가나다라마 Aa
      </div>
      <div>
        <div
          style={{ fontSize: "12px", color: "#666", fontFamily: "monospace" }}
        >
          {token}
        </div>
        <div style={{ fontSize: "12px", color: "#888" }}>
          {size} / {weight} — {usage}
        </div>
      </div>
    </div>
  );
};
