# timo-api-integration

## 트리거

- "API 연동해줘 / 연동 세팅하자"
- "orval / 제너레이터 나온 거 붙여줘"
- mock 데이터를 실제 API 호출로 교체하는 작업

## 참조

- `docs/architecture/state.md` → 서버 상태는 React Query가 단일 출처
- `docs/architecture/structure.md` → `_queries/` 위치 규칙
- `apps/timo-web/api/generated/` → orval이 생성한 훅·zod 스키마·모델 (직접 수정 금지)
- `apps/timo-web/api/client/custom-instance.ts`, `apps/timo-web/api/client/axios.ts` → axios 인스턴스, 에러 인터셉터
- `apps/timo-web/api/error/api-error.ts` → `ApiError`, `parseApiError`

## 배경

- `api/generated/endpoints/{domain}/{domain}.ts` — orval이 생성한 react-query 훅(`useGetXxx`)과 순수 fetcher 함수, `queryKey` 헬퍼, `getXxxQueryOptions` 팩토리
- `logout`/`withdraw`/`deleteTodo`/`deleteTag`/`completeOnboarding`처럼 실제로 반환 데이터가 없는 엔드포인트는 백엔드가 `data`를 Java `Object`(빈 스키마)로 선언해서 여전히 `data: zod.unknown().optional()`로 생성된다 — 이건 버그가 아니라 정상이다(정말로 shape이 없는 값이므로).
- `api/generated/models/*.ts` — 응답 DTO 타입. 실제로 항상 오는 필드는 이제 `?` 없이 생성된다. 다만 gen 스키마는 백엔드가 스펙을 바꿀 때마다 사람 리뷰 없이 재생성되므로 100% 맹신하지는 않는다.
- 그래도 도메인 로컬 zod 스키마(`app/(domain)/_types/*.ts`)로 한 번 더 검증한다 — 로컬 스키마의 `.parse()`가 "백엔드가 계약을 조용히 느슨하게 바꿨는지"를 잡아내는 방어선 역할을 한다. 로컬 스키마 작성 시 gen 응답 스키마를 기반 초안으로 그대로 가져다 쓰고, UI가 추가로 좁혀야 하는 부분(더 좁은 enum, 파생 필드 등)만 수정한다.

## 워크플로우

### Phase 1 — 대상 엔드포인트 확인

- `api/generated/endpoints/{domain}/{domain}.ts`에서 필요한 fetcher 함수(예: `getHome`)와 `getGetXxxQueryKey` 헬퍼를 찾는다.
- 응답이 `BaseResponseXxx { status, message, data }` 형태로 감싸져 있는지 `api/generated/models/`에서 확인한다 — 실제 필요한 값은 `.data`에 있다.

### Phase 2 — 로컬 zod 스키마로 응답 검증

- 도메인 `_types/*.ts`에 이미 손으로 작성한 zod 스키마가 있는지 확인한다. 없으면 생성된 응답 zod 스키마(`api/generated/endpoints/{domain}/{domain}.zod.ts`)를 기반 초안으로 가져와 작성한다 — 이제 실제 shape을 담고 있으므로 신뢰할 수 있다.
- gen 스키마와 UI가 실제로 필요로 하는 shape이 다르면(더 좁은 enum, 파생 필드 등) 로컬 스키마에서 추가로 좁힌다.
- `select`에서 로컬 스키마의 `.parse()`/`.safeParse()`로 최종 검증한다 — gen 스키마를 UI까지 직접 노출하지 않고 반드시 로컬 스키마를 한 번 거친다. 백엔드가 스펙을 다시 느슨하게 바꿔도 이 단계가 조용히 깨지지 않고 파싱 실패로 드러나게 하는 방어선이다.

### Phase 3 — `_queries/` 훅 작성

- 위치: `app/(domain)/_queries/use-xxx.ts`
- `useSuspenseQuery`를 쓸지 `useQuery`를 쓸지는 컴포넌트가 `AsyncBoundary`(Suspense) 안에 있는지로 결정한다. `AsyncBoundary`로 감싸져 있으면 `useSuspenseQuery`를 쓴다.
- **주의**: 생성된 `getGetXxxQueryOptions()` 팩토리를 그대로 `useSuspenseQuery`에 스프레드하면 `UseQueryOptions`가 허용하는 `skipToken`과 `UseSuspenseQueryOptions`가 타입 충돌을 일으킨다. `queryKey`/`queryFn`은 생성된 `getGetXxxQueryKey` + 원본 fetcher 함수로 직접 조립한다.
- `select`에서 `BaseResponse.data`를 언랩하고 로컬 zod 스키마로 `.parse()`해서 반환한다.

```ts
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import {
  getGetHomeQueryKey,
  getHome,
} from "@/api/generated/endpoints/home/home";
import { homeViewDataSchema } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";

export const useHomeView = ({ filter, baseDate }: GetHomeViewParams) =>
  useSuspenseQuery({
    queryKey: getGetHomeQueryKey({ filter, baseDate }),
    queryFn: ({ signal }) => getHome({ filter, baseDate }, undefined, signal),
    select: ({ data }) => homeViewDataSchema.parse(data),
  });
```

### Phase 4 — 컨테이너 연결

- mock 함수 import를 제거하고 새 훅으로 교체한다.
- 다른 도메인이 같은 mock을 참조하고 있는지 확인(`Grep`)하고, 참조 중이면 mock 파일 자체는 지우지 않는다.
- 로그인 연동 전이라 요청이 401/네트워크 에러로 실패할 수 있다 — `useSuspenseQuery`가 던지는 에러는 상위 `error.tsx`(라우트 레벨) 또는 `AsyncBoundary`의 `errorFallback`이 잡는지 확인한다. 둘 다 없으면 최소한 라우트 레벨 `error.tsx` 존재 여부를 확인해 화면이 완전히 깨지지 않게 한다.

### Phase 5 — 자가 검토

- [ ] `api/generated/` 내부 파일을 직접 수정하지 않았는가 (재생성 시 사라짐)
- [ ] 응답을 로컬 zod 스키마로 `.parse()`해서 검증했는가 (gen 응답 스키마를 그대로 UI까지 노출하지 않았는가)
- [ ] `useSuspenseQuery` 사용 시 `queryKey`/`queryFn`을 직접 조립해 타입 충돌을 피했는가
- [ ] `tsc --noEmit`, `eslint` 통과
- [ ] 다른 도메인이 참조하는 mock을 실수로 지우지 않았는가
