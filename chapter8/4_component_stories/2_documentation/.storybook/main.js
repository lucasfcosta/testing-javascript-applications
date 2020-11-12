module.exports = {
  stories: ["../**/*.stories.@(jsx|mdx)"],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions/register",
    {
      name: "@storybook/addon-docs",
      options: { configureJSX: true }
    }
  ],
  webpackFinal: async config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          "core-js/modules": "@storybook/core/node_modules/core-js/modules",
          "core-js/features": "@storybook/core/node_modules/core-js/features"
        }
      }
    };
  }
};
