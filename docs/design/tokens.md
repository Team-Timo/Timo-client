# 디자인 토큰

티모 디자인 시스템의 토큰 규약입니다.  
피그마 MCP 연동 후 실제 값으로 업데이트합니다 (`docs/design/figma.md` 참조).

## 네이밍 규칙

- Tailwind CSS 클래스명과 1:1 대응을 원칙으로 한다
- CSS 변수명: `--timo-{category}-{scale}`
- 컴포넌트 내에서는 Tailwind 클래스를 직접 사용하고, 커스텀 값은 `tailwind.config`에 등록한다

## Color

<!-- | 토큰 | CSS 변수 | 용도 |
|------|---------|------|
| `primary-500` | `--timo-primary-500` | 브랜드 메인 (버튼, 강조) |
| `primary-100` | `--timo-primary-100` | 브랜드 라이트 (배경 강조) |
| `gray-900` | `--timo-gray-900` | 텍스트 기본 |
| `gray-500` | `--timo-gray-500` | 텍스트 보조 |
| `gray-200` | `--timo-gray-200` | 구분선·비활성 |
| `gray-100` | `--timo-gray-100` | 배경 서피스 |
| `error-500` | `--timo-error-500` | 에러·경고 상태 |
| `success-500` | `--timo-success-500` | 완료·성공 상태 | -->

## Typography

<!-- | 토큰 | 크기 / 굵기 | 용도 |
|------|------------|------|
| `text-2xl` | 24px / 700 | 페이지 제목 |
| `text-xl` | 20px / 600 | 섹션 제목 |
| `text-lg` | 18px / 500 | 카드 제목 |
| `text-base` | 16px / 400 | 본문 기본 |
| `text-sm` | 14px / 400 | 보조 텍스트 |
| `text-xs` | 12px / 400 | 캡션·레이블 | -->

## Spacing

<!-- | 토큰 | 값 | 용도 |
|------|-----|------|
| `space-1` | 4px | 아이콘·텍스트 사이 최소 간격 |
| `space-2` | 8px | 컴포넌트 내부 패딩 |
| `space-4` | 16px | 기본 간격 |
| `space-6` | 24px | 섹션 내부 간격 |
| `space-8` | 32px | 카드·패널 간격 |
| `space-12` | 48px | 페이지 상하 여백 | -->

## Border Radius

<!-- | 토큰 | 값 | 용도 |
|------|-----|------|
| `radius-sm` | 4px | 인풋·태그 |
| `radius-md` | 8px | 버튼·카드 |
| `radius-lg` | 12px | 모달·바텀시트 |
| `radius-full` | 9999px | 뱃지·아바타 | -->
