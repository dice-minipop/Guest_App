import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import messaging from '@react-native-firebase/messaging';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';
import { Fragment, useEffect, useState } from 'react';
import { Platform, Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashImage from '@/assets/images/splash/splash.svg';
import { useAutoLogin } from '@/hooks/autoLogin';
import { requestUserPermission } from '@/hooks/useFCM';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function createNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}

export default function RootLayout() {
  const [isAppLoaded, setIsAppLoaded] = useState<boolean>(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);

  useAutoLogin(setIsAppLoaded);

  const queryClient = new QueryClient();

  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
  });

  useEffect(() => {
    if (isAppLoaded && fontsLoaded) {
      // SplashScreen.hideAsync();
      (async () => {
        await requestUserPermission();
        await createNotificationChannel();
      })();

      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        console.log('📨 FCM Notification Received:', remoteMessage);

        const { title, body } = remoteMessage.notification || {};

        // expo-notifications로 Foreground 알림 띄우기
        await Notifications.scheduleNotificationAsync({
          content: {
            title: title ?? '알림',
            body: body ?? '',
            sound: true,
          },
          trigger: null, // 즉시 표시
        });
      });

      return () => {
        unsubscribe();
      };
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationFinished(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView>
      <Host>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <BottomSheetModalProvider>
              <ActionSheetProvider>
                <Fragment>
                  <Stack>
                    <Stack.Screen name="(onBoarding)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                    <Stack.Screen name="(topTabs)" options={{ headerShown: false }} />

                    <Stack.Screen name="space" options={{ headerShown: false }} />
                    <Stack.Screen name="announcement" options={{ headerShown: false }} />
                    <Stack.Screen name="myPage" options={{ headerShown: false }} />

                    <Stack.Screen name="+not-found" />
                  </Stack>

                  <StatusBar style="dark" />

                  {!isAnimationFinished && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#000000',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SplashImage />
                    </View>
                  )}
                </Fragment>
              </ActionSheetProvider>
            </BottomSheetModalProvider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </Host>
    </GestureHandlerRootView>
  );
}
