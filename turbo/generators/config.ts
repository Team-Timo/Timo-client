import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("react-component", {
    description: "packages/ui에 새 React 컴포넌트 추가",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "컴포넌트 이름을 입력하세요 (PascalCase, 예: Button):",
        validate: (value: string) => {
          if (!value) return "컴포넌트 이름은 필수입니다.";
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(value))
            return "PascalCase로 입력해주세요 (예: Button, MyCard).";
          return true;
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/ui/src/{{pascalCase name}}.tsx",
        templateFile: "templates/component/component.tsx.hbs",
      },
    ],
  });

  plop.setGenerator("page", {
    description: "apps/timo-web에 새 App Router 페이지 추가",
    prompts: [
      {
        type: "input",
        name: "route",
        message: "라우트 경로를 입력하세요 (예: auth/login, dashboard):",
        validate: (value: string) => {
          if (!value) return "라우트 경로는 필수입니다.";
          if (/\s/.test(value))
            return "공백 없이 입력해주세요 (예: auth/login).";
          return true;
        },
      },
      {
        type: "input",
        name: "name",
        message:
          "페이지 컴포넌트 이름을 입력하세요 (PascalCase, 예: LoginPage):",
        validate: (value: string) => {
          if (!value) return "컴포넌트 이름은 필수입니다.";
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(value))
            return "PascalCase로 입력해주세요 (예: LoginPage, DashboardPage).";
          return true;
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "apps/timo-web/app/{{route}}/page.tsx",
        templateFile: "templates/page/page.tsx.hbs",
      },
    ],
  });
}
