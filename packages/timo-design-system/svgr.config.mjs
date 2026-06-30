/** @type {import('@svgr/core').Config} */
const config = {
  icon: false,
  typescript: true,
  jsxRuntime: "automatic",
  prettier: false,
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      {
        name: "removeAttrs",
        params: { attrs: ["style"] },
      },
    ],
  },
  svgProps: {
    "aria-hidden": "true",
  },
  template: (variables, { tpl }) => {
    const name = variables.componentName.replace(/^Svg/, "") + "Icon";
    return tpl`
${variables.imports};

const ${name} = (${variables.props}) => (
  ${variables.jsx}
);

export { ${name} };
`;
  },
};

export default config;
