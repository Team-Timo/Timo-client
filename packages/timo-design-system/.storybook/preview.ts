import React from "react";

import type { Preview } from "@storybook/react";

import "../src/styles/globals.css";

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    (Story) =>
      React.createElement(
        "div",
        {
          style: {
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "120px",
          },
        },
        React.createElement(Story),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1280px", height: "900px" },
        },
      },
      defaultViewport: "responsive",
    },
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "gray", value: "#f5f5f5" },
        { name: "dark", value: "#1f1f1f" },
      ],
    },
    options: {
      storySort: {
        order: ["Guides", "Tokens", "Components", "Icons"],
      },
    },
    actions: {
      argTypesRegex: "^on[A-Z].*",
    },
  },
};

export default preview;
