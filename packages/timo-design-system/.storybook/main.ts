// 스토리북이 어디서 스토리 파일을 찾을지 정하는 곳
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};

export default config;
