function createEslintCommand(packageDir) {
  return `pnpm -C ${packageDir} exec eslint --fix --max-warnings 0`;
}

module.exports = {
  "**/*.{md,json}": "prettier --write",
  "apps/timo-web/**/*.{ts,tsx,js,jsx,mjs,cjs}": [
    "prettier --write",
    createEslintCommand("apps/timo-web"),
  ],
  "packages/timo-design-system/**/*.{ts,tsx,js,jsx,mjs,cjs}": [
    "prettier --write",
    createEslintCommand("packages/timo-design-system"),
  ],
};
