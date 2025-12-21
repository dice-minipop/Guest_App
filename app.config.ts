import { ExpoConfig, ConfigContext } from '@expo/config';
import { config } from 'dotenv';

config();

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID;
const nativeAppKey = process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY;

const defineConfig = (_: ConfigContext): ExpoConfig => ({
  owner: 'minipop',
  name: 'dice',
  slug: 'dice',
  version: '1.1',
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
  runtimeVersion: '1.1',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.cmc.dice.minipop.expo',
    buildNumber: '1.0.0',
    entitlements: {
      'aps-environment': 'production',
    },
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSUserNotificationUsageDescription: '푸시 알림을 통해 중요한 알림을 받을 수 있습니다.',
      NSPhotoLibraryUsageDescription:
        'The app accesses the photo library to upload your profile when you are signing up or updating profile image.',
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
      UIBackgroundModes: ['remote-notification'],
      aps: {
        alert: true,
        badge: true,
        sound: true,
      },
    },
    googleServicesFile: process.env.GOOGLE_SERVICES_INFO_PLIST ?? './GoogleService-Info.plist',
  },
  android: {
    package: 'com.cmc.dice.minipop.expo',
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/images/android_logo.png',
      backgroundColor: '#000000',
    },
    permissions: [],
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      '@react-native-firebase/app',
      {
        ios: {
          googleServicesFile:
            process.env.GOOGLE_SERVICES_INFO_PLIST ?? './GoogleService-Info.plist',
        },
      },
    ],
    [
      '@react-native-firebase/messaging',
      {
        ios: {
          capabilities: ['remote-notification'],
          backgroundModes: ['remote-notification'],
        },
      },
    ],
    '@react-native-firebase/analytics',
    [
      'expo-notifications',
      {
        ios: { skipNativeNotificationListener: true },
        android: { skipNativeNotificationListener: true },
      },
    ],
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash/splash-icon-light.png',
        imageWidth: 180,
        resizeMode: 'contain',
        backgroundColor: '#000000',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          extraMavenRepos: [
            'https://repository.map.naver.com/archive/maven',
            'https://devrepo.kakao.com/nexus/content/groups/public/',
          ],
          enableProguardInReleaseBuilds: true,
        },
        ios: {
          useFrameworks: 'static',
          podfileProperties: {
            use_modular_headers: true,
          },
        },
      },
    ],
    [
      '@react-native-kakao/core',
      {
        nativeAppKey: nativeAppKey,
        android: {
          authCodeHandlerActivity: true,
        },
        ios: {
          handleKakaoOpenUrl: true,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});

export default defineConfig;
