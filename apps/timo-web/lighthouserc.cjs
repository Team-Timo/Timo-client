/* global module */
"use strict";

module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3000/en",
        "http://localhost:3000/en/home",
        "http://localhost:3000/en/today",
        "http://localhost:3000/en/focus",
        "http://localhost:3000/en/statistics",
        "http://localhost:3000/en/onboarding",
        "http://localhost:3000/en/settings",
        "http://localhost:3000/en/settings/account",
        "http://localhost:3000/en/settings/policy",
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
