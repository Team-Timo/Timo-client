import { create } from "@storybook/theming";

export const timoTheme = create({
  base: "light",

  brandImage: "/timo-logo/timo-logo.png",
  brandTitle: "TIMO DESIGN SYSTEM",
  brandUrl: "https://timo.kr",
  brandTarget: "_blank",

  // 배경
  colorPrimary: "#74A0F8",
  colorSecondary: "#8CB0F9",

  // UI
  appBg: "#f5f5f5",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#e5e5e5",
  appBorderRadius: 10,

  // 텍스트
  textColor: "#1f1f1f",
  textMutedColor: "#757575",
  textInverseColor: "#ffffff",

  // 툴바
  barTextColor: "#525252",
  barHoverColor: "#8CB0F9",
  barSelectedColor: "#74a0f8",
  barBg: "#ffffff",

  // 인풋
  inputBg: "#ffffff",
  inputBorder: "#e5e5e5",
  inputTextColor: "#1f1f1f",
  inputBorderRadius: 6,

  // 버튼
  buttonBg: "#f5f5f5",
  buttonBorder: "#e5e5e5",
});
