import { Stack } from 'expo-router';

export default function TermsLayout() {
  return (
    <Stack>
      {/* 이용약관 */}
      <Stack.Screen name="terms-of-service" options={{ headerShown: false }} />

      {/* 개인정보 처리방침 */}
      <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
    </Stack>
  );
}
