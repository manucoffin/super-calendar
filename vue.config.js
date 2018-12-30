module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
      ? '/dist/'
      : '/',
  lintOnSave: false,
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Add sass files you want to be available throughout all the application here
          resources: ['./src/assets/styles/mixins.scss', './src/assets/styles/variables.scss']
        })
        .end()
    });
  },
};
