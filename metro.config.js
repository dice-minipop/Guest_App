// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // NativeWind 설정을 적용
  const nativeWindConfig = withNativeWind(config, { input: './global.css' });

  // react-native-svg-transformer 설정을 적용
  const { transformer, resolver } = nativeWindConfig;

  nativeWindConfig.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  };

  nativeWindConfig.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  return nativeWindConfig;
})();
