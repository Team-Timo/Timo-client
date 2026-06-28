export interface TypographyToken {
  token: string;
  size: string;
  weight: string;
  usage: string;
}

export const TYPOGRAPHY_TOKENS: TypographyToken[] = [
  { token: "text-2xl", size: "24px", weight: "700", usage: "페이지 제목" },
  { token: "text-xl", size: "20px", weight: "600", usage: "섹션 제목" },
  { token: "text-lg", size: "18px", weight: "500", usage: "카드 제목" },
  { token: "text-base", size: "16px", weight: "400", usage: "본문 기본" },
  { token: "text-sm", size: "14px", weight: "400", usage: "보조 텍스트" },
  { token: "text-xs", size: "12px", weight: "400", usage: "캡션·레이블" },
];
