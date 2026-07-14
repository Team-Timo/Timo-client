# timo-figma

> 피그마 MCP 연동 후 활성화되는 스킬입니다.

## 트리거

- "피그마에서 컴포넌트 뽑아줘"
- "피그마 링크 줄게, 이거 구현해줘"
- 피그마 링크 또는 노드 ID를 제공받은 경우

## 참조

- `docs/design/tokens.md` → 색상·타이포 토큰 목록 및 클래스명
- `docs/design/figma.md` → MCP 설정 방법
- `docs/architecture/components.md` → 컴포넌트 계층
- `docs/architecture/structure.md` → 모노레포 구조
- `docs/conventions/code-style.md` → 컴포넌트 구조·네이밍 규칙

---

## Phase 1 — 피그마 노드 읽기

아래 기준으로 MCP 도구를 선택한다:

| 목적                                   | 도구                   |
| -------------------------------------- | ---------------------- |
| 컴포넌트 크기·색상·폰트·간격 전체 읽기 | `get_design_context`   |
| 레이아웃을 시각적으로 확인             | `get_screenshot`       |
| 피그마 변수(토큰) 목록 확인            | `get_variable_defs`    |
| 컴포넌트명으로 검색                    | `search_design_system` |
| SVG·이미지 에셋 추출                   | `download_assets`      |

`get_design_context`로 아래 값을 수집한다:

- **크기**: width, height
- **색상**: fill hex, text hex
- **타이포**: font-size, font-weight
- **간격**: padding, gap
- **radius**: border-radius
- **variant 목록**: 피그마 component set의 variant 이름

---

## Phase 2 — 디자인 토큰 매핑

`docs/design/tokens.md`를 읽어 수집한 값을 Tailwind 클래스로 변환한다.

**색상**: Color 표에서 hex를 찾아 `bg-timo-{token}` / `text-timo-{token}` 형태로 변환한다.  
표에 없는 hex가 나오면 → 사용자에게 "토큰에 없는 값입니다. 추가할까요?" 확인 후 진행.

**타이포**: Typography 표에서 font-size + font-weight 조합을 찾아 `typo-{token}` 클래스로 변환한다.

**크기·간격**: Tailwind 기본 단위 **1 = 4px**. `px ÷ 4`로 수치를 구한다.  
4px 단위로 떨어지지 않으면 `h-[{n}px]`, `w-[{n}px]` arbitrary value를 사용한다.

**Border Radius**:

| 피그마 값  | 클래스          |
| ---------- | --------------- |
| 4px        | `rounded-[4px]` |
| 8px        | `rounded-lg`    |
| 12px       | `rounded-xl`    |
| 50% / 원형 | `rounded-full`  |

---

## Phase 3 — 컴포넌트 위치 결정

피그마 컴포넌트가 어느 계층에 속하는지 판단한다.

| 판단 기준                           | 위치                                                 |
| ----------------------------------- | ---------------------------------------------------- |
| 여러 앱·패키지에서 공유하는 순수 UI | `packages/timo-design-system/src/components/{name}/` |
| timo-web 전역에서 공유하는 순수 UI  | `apps/timo-web/components/`                          |
| 특정 도메인에서만 쓰이는 순수 UI    | `apps/timo-web/app/(domain)/_components/`            |
| 특정 도메인 + 상태·쿼리 결합        | `apps/timo-web/app/(domain)/_containers/`            |

**순수 UI 판단**: `'use client'` 없이도 동작 가능하면 `_components`. useQuery·zustand·useState가 필요하면 `_containers`.

---

## Phase 4 — 컴포넌트 구현

### 공통 규칙 (`docs/conventions/code-style.md`)

- Arrow function + Named export: `export const {Name} = (props: {Name}Props) => {}`
- Props 타입은 `interface {Name}Props`로 정의, `any` 금지
- Tailwind 클래스만 사용, 인라인 style 금지
- 조건부 클래스는 `cn()` 유틸 사용

### variant가 있는 경우 — Record 패턴

```tsx
import { cn } from "../../lib";

export type Priority = "매우중요" | "중요" | "보통" | "낮음" | "Disable";

const PRIORITY_COLOR: Record<Priority, string> = {
  매우중요: "bg-timo-red",
  중요: "bg-timo-orange",
  보통: "bg-timo-gray-600",
  낮음: "bg-timo-black",
  Disable: "bg-timo-gray-500",
};

export interface PriorityIconProps {
  priority: Priority;
}

export const PriorityIcon = ({ priority = "매우중요" }: PriorityIconProps) => {
  return (
    <div
      className={cn("size-4.5 shrink-0 rounded-full", PRIORITY_COLOR[priority])}
    />
  );
};
```

### variant가 없는 경우 — 인라인 클래스

```tsx
export interface TagProps {
  text: string;
}

export const Tag = ({ text = "과제" }: TagProps) => {
  return (
    <div className="bg-timo-gray-300 flex h-4 w-7.5 items-center justify-center rounded-[4px]">
      <span className="typo-caption-r-10 text-timo-gray-800 whitespace-nowrap">
        {text}
      </span>
    </div>
  );
};
```

### design-system 컴포넌트 추가 작업

`packages/timo-design-system`에 추가하는 경우에만 아래를 추가로 수행한다:

**파일 구조**: 컴포넌트별 폴더로 분리

```
packages/timo-design-system/src/components/
  {name}/
    {Name}.tsx
    {Name}.stories.tsx
```

**index.ts re-export 등록**:

```ts
// packages/timo-design-system/src/components/index.ts
export { {Name} } from "./{name}/{Name}";
```

---

## Phase 5 — Story 작성 (design-system 한정)

`timo-storybook` 워크플로우를 따른다. design-system 컴포넌트가 아니면 생략한다.

- variant가 있으면 각 variant마다 Story export 추가
- `argTypes`에 props Control 연동
- 위치: `{Name}.stories.tsx` (컴포넌트와 같은 폴더)

---

## 자가 검토

- [ ] 피그마 hex가 토큰 클래스로 변환되고 하드코딩되지 않았는가
- [ ] variant별 클래스가 Record로 분리되어 있는가
- [ ] `_components` vs `_containers` 구분이 올바른가
- [ ] design-system이면 `index.ts` re-export가 추가되었는가
- [ ] `any` 미사용, ESLint 오류 없음
