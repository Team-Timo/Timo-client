/* global module */
"use strict";

module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3000",
        "http://localhost:3000/home",
        "http://localhost:3000/today",
        "http://localhost:3000/focus",
        "http://localhost:3000/statistics",
        "http://localhost:3000/onboarding",
        "http://localhost:3000/settings",
        "http://localhost:3000/settings/account",
        "http://localhost:3000/settings/term",
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
