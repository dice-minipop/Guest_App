import { ExpoConfig, ConfigContext } from '@expo/config';
import { config } from 'dotenv';

config();

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID;
const apiKey = process.env.EXPO_PUBLIC_GOOGLEMAP_API_KEY;

const defineConfig = (_: ConfigContext): ExpoConfig => ({
  owner: 'minipop',
  name: 'dice - 팝업 운영 올인원 솔루션',
  slug: 'dice',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: projectId,
    },
    apiUrl: apiUrl,
  },
  updates: {
    url: `https://u.expo.dev/${projectId}`,
  },
  runtimeVersion: '1.0.0',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.cmc.dice.minipop.expo',
    buildNumber: '1.0.0',
    infoPlist: {
      NSPhotoLibraryUsageDescription:
        'The app accesses the photo library to upload your profile when you are signing up or updating profile image.',
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
    },
    config: {
      googleMapsApiKey: apiKey,
    },
  },
  android: {
    package: 'com.cmc.dice.minipop.expo',
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive_icon.png',
      backgroundColor: '#000000',
    },
    permissions: [],
    config: {
      googleMaps: {
        apiKey: apiKey,
      },
    },
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
        client_id: 'pk2penm8t7',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          extraMavenRepos: ['https://repository.map.naver.com/archive/maven'],
          enableProguardInReleaseBuilds: true,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});

export default defineConfig;
