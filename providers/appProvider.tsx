import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { Text, TextInput } from 'react-native';
import { Host } from 'react-native-portalize';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface AppProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling = false;

(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(TextInput as unknown as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//     shouldShowBanner: true, // 새로 추가
//     shouldShowList: true, // 새로 추가
//   }),
// });

// async function createNotificationChannel() {
//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'Default',
//       importance: Notifications.AndroidImportance.HIGH,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }
// }

SplashScreen.setOptions({
  duration: 3000,
  fade: true,
});

export const AppProvider: React.FC<AppProvidersProps> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
  });

  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      // (async () => {
      //   await requestUserPermission();
      //   await createNotificationChannel();
      // })();

      // const messaging = getMessaging();

      // const unsubscribe = onMessage(messaging, async (remoteMessage) => {
      //   console.log('📨 FCM Notification Received:', remoteMessage);

      //   const { title, body } = remoteMessage.notification || {};

      //   await Notifications.scheduleNotificationAsync({
      //     content: {
      //       title: title ?? '알림',
      //       body: body ?? '',
      //       sound: true,
      //     },
      //     trigger: null,
      //   });
      // });

      // return () => {
      //   unsubscribe();
      // };
      setIsReady(true);
    }
  }, [fontsLoaded]);

  if (!isReady) return null;

  return (
    <Host>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>
            <ActionSheetProvider>{children}</ActionSheetProvider>
          </BottomSheetModalProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </Host>
  );
};
