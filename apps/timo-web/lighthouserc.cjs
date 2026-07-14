/* global module */
"use strict";

module.exports = {
  ci: {
    collect: {
      // "/en", "/en/onboarding", and the "/en/settings*" routes are still
      // placeholder pages (`return <></>`) with no content to paint, so
      // Lighthouse always times out with NO_FCP there — omit them until
      // they're implemented.
      url: [
        "http://localhost:3000/en/home",
        "http://localhost:3000/en/today",
        "http://localhost:3000/en/focus",
        "http://localhost:3000/en/statistics",
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags:
          "--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage",
      },
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "categories:performance": ["warn", { minScore: 0.7 }],
        "categories:accessibility": ["warn", { minScore: 0.85 }],
        "categories:best-practices": ["warn", { minScore: 0.8 }],
        "categories:seo": ["warn", { minScore: 0.8 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%",
    },
  },
};
