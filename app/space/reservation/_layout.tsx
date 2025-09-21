import { Stack } from 'expo-router';

export default function SpaceReservationLayout() {
  return (
    <Stack>
      {/* 브랜드 프로필 확인 */}
      <Stack.Screen name="checkProfile" options={{ headerShown: false }} />

      {/* 행사 정보 입력 */}
      <Stack.Screen name="inputInformation" options={{ headerShown: false }} />

      {/* 신청 완료 */}
      <Stack.Screen name="complete" options={{ headerShown: false }} />
    </Stack>
  );
}
