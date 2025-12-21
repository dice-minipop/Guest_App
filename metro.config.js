// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// SVG transformer 설정
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer/expo');

// SVG 확장자 추가
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg', 'stories.ts', 'stories.tsx'];

// NativeWind로 감싸서 export
module.exports = withNativeWind(config, { input: './global.css' });
