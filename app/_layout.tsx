import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as TrackingTransparency from 'expo-tracking-transparency';
import 'react-native-reanimated';
import '../global.css';
import { Fragment, useEffect, useState } from 'react';
import { Platform, Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashImage from '@/assets/images/splash/splash.svg';
import { useAutoLogin } from '@/hooks/useAutoLogin';
import { requestUserPermission } from '@/hooks/useFCM';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean; style?: any };
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean; style?: any };
}

// Text, TextInput 기본 설정 (스케일링)
(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(TextInput as unknown as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
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
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);

  const { loading } = useAutoLogin();

  const queryClient = new QueryClient();

  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
  });

  useEffect(() => {
    if (!loading && fontsLoaded) {
      // SplashScreen.hideAsync();
      (async () => {
        // 추적 동의 요청 및 Analytics 활성화
        if (Platform.OS === 'ios') {
          try {
            const { status } = await TrackingTransparency.requestTrackingPermissionsAsync();
            if (status === 'granted') {
              // 추적 동의가 허용된 경우에만 Analytics 활성화
              await analytics().setAnalyticsCollectionEnabled(true);
              console.log('✅ iOS 추적 동의 허용, Analytics 활성화');
            } else {
              console.log('⚠️ iOS 추적 동의 거부됨');
              // 동의가 거부되어도 Analytics는 비활성화 상태로 유지
              await analytics().setAnalyticsCollectionEnabled(false);
            }
          } catch (error) {
            console.error('❌ 추적 동의 요청 실패:', error);
          }
        } else {
          // Android는 별도 추적 동의가 필요 없지만, Analytics 활성화
          try {
            await analytics().setAnalyticsCollectionEnabled(true);
            console.log('✅ Android Analytics 활성화');
          } catch (error) {
            console.error('❌ Analytics 활성화 실패:', error);
          }
        }

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
