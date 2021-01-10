module.exports = {
  configureWebpack: (config) => {
    config.devtool = "source-map";
  },
  //   chainWebpack: (config) => {
  //     config.optimization.minimize(false);
  //     config.plugin("html").tap((args) => {
  //       args[0].minify = false;
  //       return args;
  //     });
  //   },
};
