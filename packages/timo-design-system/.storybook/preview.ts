import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
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
      defaultViewport: "desktop",
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
