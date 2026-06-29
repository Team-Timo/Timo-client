export interface ColorToken {
  name: string;
  cssVar: string;
  value: string;
}

export const COLOR_TOKENS: ColorToken[] = [
  { name: "timo-blue-50", cssVar: "--color-timo-blue-50", value: "#F1F6FE" },
  { name: "timo-blue-65", cssVar: "--color-timo-blue-65", value: "#DEE9FF" },
  { name: "timo-blue-75", cssVar: "--color-timo-blue-75", value: "#C6D8FC" },
  { name: "timo-blue-100", cssVar: "--color-timo-blue-100", value: "#AEC8FB" },
  { name: "timo-blue-200", cssVar: "--color-timo-blue-200", value: "#8CB0F9" },
  { name: "timo-blue-300", cssVar: "--color-timo-blue-300", value: "#74A0F8" },

  { name: "timo-gray-300", cssVar: "--color-timo-gray-300", value: "#F5F5F5" },
  { name: "timo-gray-500", cssVar: "--color-timo-gray-500", value: "#E6E8E8" },
  { name: "timo-gray-600", cssVar: "--color-timo-gray-600", value: "#D8D8D8" },
  { name: "timo-gray-700", cssVar: "--color-timo-gray-700", value: "#9F9F9F" },
  { name: "timo-gray-800", cssVar: "--color-timo-gray-800", value: "#757575" },
  { name: "timo-gray-900", cssVar: "--color-timo-gray-900", value: "#3F3F3F" },
  {
    name: "timo-yellow-300",
    cssVar: "--color-timo-yellow-300",
    value: "#F2FC9F",
  },
  { name: "timo-black", cssVar: "--color-timo-black", value: "#121212" },
  { name: "timo-red", cssVar: "--color-timo-red", value: "#FF6650" },
  { name: "timo-orange", cssVar: "--color-timo-orange", value: "#FFB157" },
  { name: "timo-gray", cssVar: "--color-timo-gray", value: "#BEBEBE" },
];
