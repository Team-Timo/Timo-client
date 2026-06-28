import path from "path";

import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@tokens": path.resolve(__dirname, "../src/tokens"),
      "@components": path.resolve(__dirname, "../src/components"),
      "@icons": path.resolve(__dirname, "../src/icons"),
      "@lib": path.resolve(__dirname, "../src/lib"),
    };
    return config;
  },
};

export default config;
