module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Only add nativewind if it's properly installed
      ...(process.env.NODE_ENV !== 'production' ? [] : []),
    ],
  };
};