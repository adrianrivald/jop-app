const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = function (config, env) {
  if (process.env.NODE_ENV !== 'production') {
    config.plugins.push(
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './src/service-worker.js',
        swDest: 'service-worker.js',
        compileSrc: true,
      })
    );
  } else {
    config.plugins = config.plugins.map((plugin) => {
      if (plugin.constructor.name === 'GenerateSW') {
        return new WorkboxWebpackPlugin.InjectManifest({
          swSrc: './src/service-worker.js',
          swDest: 'service-worker.js',
          compileSrc: true,
        });
      }
      return plugin;
    });
  }

  return config;
};
