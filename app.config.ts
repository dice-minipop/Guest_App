import { ExpoConfig, ConfigContext } from '@expo/config';

import { config } from 'dotenv';

config();

const projectId = process.env.EXPO_PUBLIC_PROJECT_ID;
const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;
const clientId = process.env.EXPO_PUBLIC_NMFClientId;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: 'nunkkocht',
  name: 'dice - 팝업 운영 올인원 솔루션',
  slug: 'dice',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  extra: {
    serverUrl,
    router: {
      origin: false,
    },
    eas: {
      projectId,
    },
  },
  updates: {
    url: `https://u.expo.dev/${projectId}`,
  },
  runtimeVersion: '1.0.0',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.minipop.dice',
    buildNumber: '1.0.0',
    infoPlist: {
      NSPhotoLibraryUsageDescription:
        'The app accesses the photo library to upload your profile when you are signing up or updating profile image.',
    },
  },
  android: {
    package: 'com.minipop.dice',
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/images/icon.png',
      backgroundColor: '#ffffff',
    },
    permissions: [],
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash.png',
        imageWidth: 97,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    [
      '@mj-studio/react-native-naver-map',
      {
        client_id: clientId,
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          extraMavenRepos: ['https://repository.map.naver.com/archive/maven'],
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
