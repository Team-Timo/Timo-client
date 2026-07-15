# 디자인 토큰

티모 디자인 시스템의 토큰 규약입니다.  
피그마 MCP 연동 후 실제 값으로 업데이트합니다 (`docs/design/figma.md` 참조).

## 네이밍 규칙

- Tailwind CSS 클래스명과 1:1 대응을 원칙으로 한다
- CSS 변수명: `--color-timo-{category}[-{scale}]` (단색 토큰은 scale 생략)
- 컴포넌트 내에서는 Tailwind 클래스를 직접 사용하고, 커스텀 값은 `tailwind.config`에 등록한다

## Color

소스: `packages/tailwind-config/tokens/colors.css`  
Tailwind 클래스 사용 예: `bg-timo-blue-50`, `text-timo-gray-900`

### Blue

| 토큰            | CSS 변수                | 값        |
| --------------- | ----------------------- | --------- |
| `timo-blue-50`  | `--color-timo-blue-50`  | `#f1f6fe` |
| `timo-blue-65`  | `--color-timo-blue-65`  | `#dee9ff` |
| `timo-blue-75`  | `--color-timo-blue-75`  | `#c6d8fc` |
| `timo-blue-100` | `--color-timo-blue-100` | `#aec8fb` |
| `timo-blue-200` | `--color-timo-blue-200` | `#8cb0f9` |
| `timo-blue-300` | `--color-timo-blue-300` | `#74a0f8` |

### Gray

| 토큰            | CSS 변수                | 값        |
| --------------- | ----------------------- | --------- |
| `timo-gray-200` | `--color-timo-gray-200` | `#fbfbfb` |
| `timo-gray-300` | `--color-timo-gray-300` | `#f5f5f5` |
| `timo-gray-500` | `--color-timo-gray-500` | `#e6e8e8` |
| `timo-gray-600` | `--color-timo-gray-600` | `#d8d8d8` |
| `timo-gray-700` | `--color-timo-gray-700` | `#9f9f9f` |
| `timo-gray-800` | `--color-timo-gray-800` | `#757575` |
| `timo-gray-900` | `--color-timo-gray-900` | `#3f3f3f` |
| `timo-gray`     | `--color-timo-gray`     | `#bebebe` |

### Accent

| 토큰              | CSS 변수                  | 값        |
| ----------------- | ------------------------- | --------- |
| `timo-yellow-300` | `--color-timo-yellow-300` | `#f2fc9f` |
| `timo-red`        | `--color-timo-red`        | `#ff6650` |
| `timo-orange`     | `--color-timo-orange`     | `#ffb157` |

### Base

| 토큰           | CSS 변수               | 값                 |
| -------------- | ---------------------- | ------------------ |
| `timo-black`   | `--color-timo-black`   | `#121212`          |
| `timo-overlay` | `--color-timo-overlay` | `rgb(0 0 0 / 10%)` |

## Typography

소스: `packages/tailwind-config/tokens/typography.css`  
Tailwind 클래스 사용 예: `typo-headline-b-24`, `typo-body-r-12`  
모든 토큰의 `line-height: 1.5`, `letter-spacing: -0.03em`은 공통 적용됩니다.

웨이트 약어: `b` = Bold(700) · `sb` = SemiBold(600) · `m` = Medium(500) · `r` = Regular(400)

### Headline

| 토큰            | 클래스               | 크기 | 굵기 |
| --------------- | -------------------- | ---- | ---- |
| `headline-b-50` | `typo-headline-b-50` | 50px | 700  |
| `headline-b-40` | `typo-headline-b-40` | 40px | 700  |
| `headline-b-30` | `typo-headline-b-30` | 30px | 700  |
| `headline-m-26` | `typo-headline-m-26` | 26px | 500  |
| `headline-b-24` | `typo-headline-b-24` | 24px | 700  |
| `headline-b-22` | `typo-headline-b-22` | 22px | 700  |
| `headline-b-20` | `typo-headline-b-20` | 20px | 700  |
| `headline-m-20` | `typo-headline-m-20` | 20px | 500  |
| `headline-b-18` | `typo-headline-b-18` | 18px | 700  |
| `headline-b-16` | `typo-headline-b-16` | 16px | 700  |
| `headline-m-16` | `typo-headline-m-16` | 16px | 500  |
| `headline-b-14` | `typo-headline-b-14` | 14px | 700  |
| `headline-m-14` | `typo-headline-m-14` | 14px | 500  |
| `headline-r-14` | `typo-headline-r-14` | 14px | 400  |

### Body

| 토큰         | 클래스            | 크기 | 굵기 |
| ------------ | ----------------- | ---- | ---- |
| `body-b-12`  | `typo-body-b-12`  | 12px | 700  |
| `body-sb-12` | `typo-body-sb-12` | 12px | 600  |
| `body-m-12`  | `typo-body-m-12`  | 12px | 500  |
| `body-r-12`  | `typo-body-r-12`  | 12px | 400  |
| `body-sb-11` | `typo-body-sb-11` | 11px | 600  |

### Caption

| 토큰           | 클래스              | 크기 | 굵기 |
| -------------- | ------------------- | ---- | ---- |
| `caption-r-10` | `typo-caption-r-10` | 10px | 400  |

## Radius

소스: `packages/tailwind-config/tokens/radius.css`  
Tailwind 클래스 사용 예: `rounded-4`, `rounded-8`, `rounded-12`

| 토큰        | CSS 변수      | 값     |
| ----------- | ------------- | ------ |
| `radius-4`  | `--radius-4`  | `4px`  |
| `radius-8`  | `--radius-8`  | `8px`  |
| `radius-12` | `--radius-12` | `12px` |

## Shadow

소스: `packages/tailwind-config/theme.css`  
Tailwind 클래스 사용 예: `shadow-timo`

| 토큰          | CSS 변수        | 값                                    |
| ------------- | --------------- | ------------------------------------- |
| `shadow-timo` | `--shadow-timo` | `0px 0px 3px 0px rgba(0, 0, 0, 0.12)` |

## Z-Index

소스: `packages/tailwind-config/theme.css`  
모달 오버레이·패널이 겹칠 때 스택 순서를 고정하기 위한 토큰입니다.

| 토큰                    | CSS 변수                  | 값   |
| ----------------------- | ------------------------- | ---- |
| `z-index-modal-overlay` | `--z-index-modal-overlay` | `40` |
| `z-index-modal-panel`   | `--z-index-modal-panel`   | `50` |
