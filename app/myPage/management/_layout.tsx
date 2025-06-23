import { Stack } from 'expo-router';

export default function TermsLayout() {
  return (
    <Stack>
      {/* 브랜드 정보 관리 */}
      <Stack.Screen name="brand" options={{ headerShown: false }} />

      {/* 게스트 회원 정보 관리 */}
      <Stack.Screen name="guest" options={{ headerShown: false }} />

      {/* 비밀번호 재설정 */}
      <Stack.Screen name="resetPassword" options={{ headerShown: false }} />
    </Stack>
  );
}
