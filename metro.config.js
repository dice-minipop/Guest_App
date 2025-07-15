// Learn more https://docs.expo.io/guides/customizing-metro
const path = require('path');

const withStorybook = require('@storybook/react-native/metro/withStorybook');
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
    sourceExts: [...resolver.sourceExts, 'svg', 'stories.ts', 'stories.tsx'],
  };

  const storybookConfig = withStorybook(nativeWindConfig, {
    enabled: true,
    configPath: path.resolve(__dirname, './.rnstorybook'),
    useJs: true, // 스토리북 설정 파일이 js인 경우 true
  });

  return storybookConfig;
})();
