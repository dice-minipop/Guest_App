import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useAutoLogin } from '@/hooks/useAutoLogin';
import { AppProvider } from '@/providers/appProvider';
import { useAuthStore } from '@/zustands/auth/auth';

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();
  const { loading } = useAutoLogin();

  if (loading) return null;

  return (
    <GestureHandlerRootView>
      <AppProvider>
        <Stack>
          {/* 로그인하지 않은 상태 */}
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="(onBoarding)" options={{ headerShown: false }} />
          </Stack.Protected>

          {/* 로그인한 상태 */}
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen name="(topTabs)" options={{ headerShown: false }} />

            <Stack.Screen name="space" options={{ headerShown: false }} />
            <Stack.Screen name="announcement" options={{ headerShown: false }} />
            <Stack.Screen name="myPage" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Screen name="storybook" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
