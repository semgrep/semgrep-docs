module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  module.exports = function (api) {
    return {
      plugins: ['macros'],
    }
};