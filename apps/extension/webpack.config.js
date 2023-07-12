const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  console.log("fallback by crypto-browserify");
  // config.resolve.fallback  = { "crypto": require.resolve("crypto-browserify") };
  return config;
};
