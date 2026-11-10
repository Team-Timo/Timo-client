import type { MetadataRoute } from "next";

const APP_NAME = "timo";
const THEME_COLOR = "#ffffff";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: APP_NAME,
    short_name: APP_NAME,
    description: "흩어진 시간을, 실행 가능한 흐름으로.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
