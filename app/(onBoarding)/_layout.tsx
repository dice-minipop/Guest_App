import { Stack } from 'expo-router';

export default function OnBoardingLayout() {
  return (
    <Stack>
      {/* 시작 화면 */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* 로그인 */}
      <Stack.Screen name="login" options={{ headerShown: false }} />

      {/* 회원가입 */}
      <Stack.Screen name="register" options={{ headerShown: false }} />

      {/* 비밀번호 찾기 */}
      <Stack.Screen name="findPassword" options={{ headerShown: false }} />
    </Stack>
  );
}
