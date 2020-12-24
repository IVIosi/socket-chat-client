const postcssPresetEnv = require('postcss-preset-env');
const autoPrefixer = require('autoprefixer');

module.exports = {
  plugins: [postcssPresetEnv, autoPrefixer],
};
