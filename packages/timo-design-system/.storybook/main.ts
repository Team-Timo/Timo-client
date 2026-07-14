import path from "node:path";

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
      "@components": path.resolve(__dirname, "../src/components"),
      "@tokens": path.resolve(__dirname, "../src/tokens"),
      "@icons": path.resolve(__dirname, "../src/icons"),
      "@lib": path.resolve(__dirname, "../src/lib"),
      "@styles": path.resolve(__dirname, "../src/styles"),
      "@assets": path.resolve(__dirname, "../src/assets"),
      "@guides": path.resolve(__dirname, "../src/guides"),
    };
    return config;
  },
};

export default config;
