import { ColorToken } from "../../tokens/colort-token";

export const Color = ({ name, cssVar, value, usage }: ColorToken) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "12px 0",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "8px",
          backgroundColor: value,
          border: "1px solid #e0e0e0",
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontWeight: 600, fontSize: "14px" }}>{name}</div>
        <div
          style={{ fontSize: "12px", color: "#666", fontFamily: "monospace" }}
        >
          {cssVar}
        </div>
        <div
          style={{ fontSize: "12px", color: "#666", fontFamily: "monospace" }}
        >
          {value}
        </div>
        <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
          {usage}
        </div>
      </div>
    </div>
  );
};
