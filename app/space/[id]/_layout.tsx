import { Stack } from 'expo-router';

export default function SpaceDetailLayout() {
  return (
    <Stack>
      {/* 상세 */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* 지도 */}
      <Stack.Screen name="map" options={{ headerShown: false }} />

      {/* 분석 */}
      <Stack.Screen name="analysis" options={{ headerShown: false }} />

      {/* 예약 완료 */}
      <Stack.Screen name="complete" options={{ headerShown: false }} />
    </Stack>
  );
}
