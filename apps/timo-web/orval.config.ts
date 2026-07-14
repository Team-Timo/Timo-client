import { loadEnvConfig } from "@next/env";
import { defineConfig } from "orval";

loadEnvConfig(process.cwd());

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!apiBaseUrl)
  throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");

const TIMO_API_SPEC_URL = `${apiBaseUrl}/v3/api-docs`;

export default defineConfig({
  timo: {
    input: {
      target: TIMO_API_SPEC_URL,
      // bearerAuth 시큐리티 스킴에 스펙 상 허용되지 않는 name 필드가 붙어 있어
      // 기본 검증기가 오탐 실패한다 (springdoc-openapi 출력 특성, orval#3203).
      // TODO: 위 orval 이슈가 upstream에서 해결되면 unsafeDisableValidation을 제거하고
      // 스펙 검증을 다시 활성화한다.
      unsafeDisableValidation: true,
    },
    output: {
      mode: "tags-split",
      client: "react-query",
      httpClient: "axios",
      target: "./api/generated/endpoints",
      schemas: "./api/generated/models",
      override: {
        mutator: {
          path: "./api/client/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: ["prettier --write", "eslint --fix"],
    },
  },
  timoZod: {
    input: {
      target: TIMO_API_SPEC_URL,
      // bearerAuth 시큐리티 스킴에 스펙 상 허용되지 않는 name 필드가 붙어 있어
      // 기본 검증기가 오탐 실패한다 (springdoc-openapi 출력 특성, orval#3203).
      // TODO: 위 orval 이슈가 upstream에서 해결되면 unsafeDisableValidation을 제거하고
      // 스펙 검증을 다시 활성화한다.
      unsafeDisableValidation: true,
    },
    output: {
      mode: "tags-split",
      client: "zod",
      target: "./api/generated/endpoints",
      fileExtension: ".zod.ts",
    },
    hooks: {
      afterAllFilesWrite: [
        "node ./scripts/fix-generated-escapes.js",
        "prettier --write",
        "eslint --fix",
      ],
    },
  },
});
