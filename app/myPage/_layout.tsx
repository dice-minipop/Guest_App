import { Stack } from 'expo-router';

export default function MyPageLayout() {
  return (
    <Stack>
      {/* 정보 관리 */}
      <Stack.Screen name="management" options={{ headerShown: false }} />

      {/* 약관 및 개인정보 처리방침 (WebView) */}
      <Stack.Screen name="(terms)" options={{ headerShown: false }} />

      {/* 회원탈퇴 */}
      <Stack.Screen name="withdraw" options={{ headerShown: false }} />
    </Stack>
  );
}
