const path = require('path');

module.exports = {
  publicPath: './',
  lintOnSave: 'warning',
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: process.env.NODE_ENV === 'development',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: process.env.NODE_ENV === 'development',
      });
      return definitions;
    });
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
};
