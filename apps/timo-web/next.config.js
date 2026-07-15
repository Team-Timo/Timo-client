/* global process */
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/timo-design-system"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withSentryConfig(withNextIntl(nextConfig), {
  org: "timo-client",
  project: "timo-web",
  authToken: process.env["SENTRY_AUTH_TOKEN"],
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
});
