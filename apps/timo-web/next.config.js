/* global process */
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/timo-design-system"],
};

export default withSentryConfig(nextConfig, {
  org: "timo-client",
  project: "timo-web",
  authToken: process.env["SENTRY_AUTH_TOKEN"],
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
});
