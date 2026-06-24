const path = require("path");

function createEslintCommand(packageDir) {
  return (filenames) => {
    const relativePaths = filenames.map((filename) =>
      path.relative(path.resolve(__dirname, packageDir), filename),
    );
    const quoted = relativePaths.map((filePath) => `'${filePath}'`).join(" ");
    return `bash -c "cd ${packageDir} && pnpm exec eslint --fix --max-warnings 0 ${quoted}"`;
  };
}

module.exports = {
  "**/*.{ts,tsx,js,jsx,mjs,cjs,md,json}": "prettier --write",
  "apps/timo-web/**/*.{ts,tsx,js,jsx}": createEslintCommand("apps/timo-web"),
  "packages/timo-design-system/**/*.{ts,tsx,js,jsx}": createEslintCommand(
    "packages/timo-design-system",
  ),
};
