import { Stack } from 'expo-router';

export default function FindPasswordLayout() {
  return (
    <Stack>
      {/* 비밀번호 찾기 화면 */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* 비밀번호 찾기 완료 화면 */}
      <Stack.Screen name="complete" options={{ headerShown: false }} />
    </Stack>
  );
}
