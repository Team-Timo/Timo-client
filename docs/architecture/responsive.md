# 반응형 구현 규칙

Tailwind 기본 `md`(768px) 하나만 쓴다. 커스텀 브레이크포인트, 직접 쓴 미디어쿼리, `matchMedia`/`useMediaQuery`는 쓰지 않는다 — 뷰포트 판별은 전부 CSS가 하고 JS는 모른다.

| 범위     | 접두사              | 기준    |
| -------- | ------------------- | ------- |
| 모바일   | 접두사 없음(기본값) | 0–767px |
| 데스크톱 | `md:`               | 768px – |

## 규칙

- **엘리먼트는 하나만 만든다.** 데스크톱용/모바일용을 별도 트리로 중복 렌더링하지 않는다. 같은 아이콘(특히 패턴 fill을 쓰는 로고류)이 한 페이지에 동시에 두 벌 있으면 내부 SVG `id` 충돌로 한쪽이 안 보일 수 있다. `className`을 `md:` 접두사로 분기해서 하나의 엘리먼트가 양쪽 역할을 겸하게 한다.

  ```tsx
  className={cn(
    "fixed ... z-50",              // 공통 + 모바일 기준값
    isMobileOpen ? "translate-x-0" : "-translate-x-full",
    "md:z-10",                      // 데스크톱 전용 override
    isOpen ? "md:translate-x-0" : "md:-translate-x-full",
  )}
  ```

- **state도 하나만 만든다.** 두 번째 브레이크포인트용 값이 필요하면 새 state부터 만들지 말고, 기존 값에서 파생(`!isOpen` 등)할 수 있는지 먼저 본다. 토글 하나가 둘 다 같이 바뀌면 영원히 어긋나지 않는다.

- **`inert`/`aria-hidden`을 두 브레이크포인트에 동시에 정확히 맞출 방법은 없다.** JS가 뷰포트를 모르기 때문에 생기는 구조적 한계다. 데스크톱 기준으로만 쓰던 속성을 모바일에도 재사용하는 엘리먼트에 그대로 남겨두면 값이 거꾸로 돈다 — 엘리먼트를 합칠 때 이런 속성이 남아있는지 반드시 다시 훑는다. 완전히 못 맞추겠으면 `inert`/포커스 트랩은 포기하고 ESC·오버레이 클릭 닫기만 남기는 것도 선택지다.

- **`translate-x-*`/`scale-*`/`rotate-*`를 트랜지션할 땐 `transition-[translate,...]`를 쓴다.** Tailwind v4는 이 유틸리티들이 `transform`이 아니라 네이티브 `translate`/`scale`/`rotate` 프로퍼티를 쓴다. `transition-[transform,...]`로 적으면 애니메이션이 안 걸리고 순간이동한다 (opacity 등 다른 프로퍼티와 같이 바뀔 때 특히 안 걸리는 게 티가 안 나서 놓치기 쉽다).

- **모바일 드로어의 z-index는 기존 모달 토큰과 같은 값을 쓴다.** `--z-index-modal-overlay`(40) / `--z-index-modal-panel`(50)과 동일한 40/50을 써서, 드로어 안에서 모달이 열려도 스택 순서가 꼬이지 않게 한다.

- **ESC 닫기는 `useEscapeKey` 훅(`@repo/timo-design-system/utils`)을 재사용한다.** `hasOpenFloatingLayer()` 가드가 내장돼 있어 위에 다른 floating layer(Dropdown 등)가 열려 있으면 그쪽을 먼저 닫는다.
