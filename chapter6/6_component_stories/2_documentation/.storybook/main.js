module.exports = {
  stories: ["../**/*.stories.@(jsx|mdx)"],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions/register",
    {
      name: "@storybook/addon-docs",
      options: { configureJSX: true }
    }
  ]
};
