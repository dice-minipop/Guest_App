import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';
import { useEffect, useState } from 'react';
import { Text, TextInput, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';

import { useAutoLogin } from '@/hooks/autoLogin';
import { useLoggedInStore } from '@/zustands/member/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function RootLayout() {
  const router = useRouter();
  const { isLoggedIn } = useLoggedInStore();
  const [isAppLoaded, setIsAppLoaded] = useState<boolean>(false);

  useAutoLogin(setIsAppLoaded);

  const colorScheme = useColorScheme();

  const queryClient = new QueryClient();

  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
  });

  useEffect(() => {
    if (isAppLoaded && fontsLoaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();

        if (isLoggedIn) {
          router.replace('/(tabs)/space');
        }
      }, 2000); // 2초 후에 SplashScreen 숨기기
    }
  }, [isAppLoaded, fontsLoaded, isLoggedIn]);

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Host>
          <QueryClientProvider client={queryClient}>
            <Stack initialRouteName={isLoggedIn ? '(tabs)' : 'index'}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="findPassword" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />

              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              {/* <Stack.Screen name="search/[type]" options={{ headerShown: false }} /> */}
              <Stack.Screen name="space/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="announcement/[id]" options={{ headerShown: false }} />

              <Stack.Screen name="(myPage)" options={{ headerShown: false }} />

              <Stack.Screen name="like" options={{ headerShown: false }} />
              <Stack.Screen name="chatBox" options={{ headerShown: false }} />
              <Stack.Screen name="chatRoom" options={{ headerShown: false }} />

              <Stack.Screen name="(terms)" options={{ headerShown: false }} />

              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </QueryClientProvider>
        </Host>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
