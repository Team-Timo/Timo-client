const HANGUL_CHAR_WEIGHT = 1.5;
const DEFAULT_CHAR_WEIGHT = 1;

/**
 * 투두명(title) 입력 제한에 사용하는 최대 가중 길이.
 * 한글 문자 가중치(1.5)를 적용하면 한국어 20자(20 * 1.5 = 30) 또는
 * 영어 30자(30 * 1 = 30)까지 입력 가능한 것과 동일한 값이다.
 */
export const TITLE_MAX_WEIGHTED_LENGTH = 30;

const HANGUL_RANGES: Array<[number, number]> = [
  [0x1100, 0x11ff], // Hangul Jamo
  [0x3130, 0x318f], // Hangul Compatibility Jamo
  [0xac00, 0xd7a3], // Hangul Syllables
];

const isHangulChar = (char: string): boolean => {
  const code = char.codePointAt(0) ?? 0;
  return HANGUL_RANGES.some(([start, end]) => code >= start && code <= end);
};

const getCharWeight = (char: string): number =>
  isHangulChar(char) ? HANGUL_CHAR_WEIGHT : DEFAULT_CHAR_WEIGHT;

/**
 * 문자열의 가중 길이를 계산한다. 한글 문자는 1.5, 그 외 문자는 1로 계산한다.
 * @param value - 길이를 계산할 문자열
 * @returns 가중치가 적용된 길이
 */
export const getWeightedLength = (value: string): number =>
  Array.from(value).reduce((total, char) => total + getCharWeight(char), 0);

/**
 * 문자열을 주어진 가중 길이 한도에 맞춰 잘라낸다. 한글 문자는 1.5, 그 외 문자는
 * 1의 가중치로 계산하며, 한도를 초과하는 지점부터는 잘려나간다.
 * @param value - 잘라낼 문자열
 * @param maxWeightedLength - 허용되는 최대 가중 길이
 * @returns 가중 길이 한도를 넘지 않는 범위로 잘라낸 문자열
 */
export const truncateToWeightedLength = (
  value: string,
  maxWeightedLength: number,
): string => {
  let total = 0;
  let result = "";

  for (const char of Array.from(value)) {
    const next = total + getCharWeight(char);
    if (next > maxWeightedLength) break;
    total = next;
    result += char;
  }

  return result;
};
