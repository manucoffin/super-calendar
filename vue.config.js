module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/assets/styles/mixins.scss', './src/assets/styles/variables.scss']
        })
        .end()
    });
  },
};
