import { Stack } from 'expo-router';

export default function TopTabsLayout() {
  return (
    <Stack>
      {/* 좋아요 목록 */}
      <Stack.Screen name="like" options={{ headerShown: false }} />

      {/* 쪽지 */}
      <Stack.Screen name="chat" options={{ headerShown: false }} />

      {/* 알림 */}
      <Stack.Screen name="notification" options={{ headerShown: false }} />
    </Stack>
  );
}
