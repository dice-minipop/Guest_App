import { Stack } from 'expo-router';

export default function ChatLayout() {
  return (
    <Stack>
      {/* 쪽지방 목록 */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* 쪽지방 상세 */}
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
