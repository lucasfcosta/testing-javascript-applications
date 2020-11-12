module.exports = {
  stories: ["../**/*.stories.jsx"],
  addons: [
    "@storybook/addon-actions/register",
    "@storybook/addon-knobs/register"
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
