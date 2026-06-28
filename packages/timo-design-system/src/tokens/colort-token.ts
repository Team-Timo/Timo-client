export interface ColorToken {
  name: string;
  cssVar: string;
  value: string;
  usage: string;
}

export const COLOR_TOKENS: ColorToken[] = [
  {
    name: "primary",
    cssVar: "--color-primary",
    value: "#111111",
    usage: "브랜드 메인 (버튼, 강조)",
  },
  {
    name: "background",
    cssVar: "--color-background",
    value: "#ffffff",
    usage: "페이지 배경",
  },
  {
    name: "foreground",
    cssVar: "--color-foreground",
    value: "#171717",
    usage: "텍스트 기본",
  },
];
