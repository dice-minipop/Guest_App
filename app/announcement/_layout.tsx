import { Stack } from 'expo-router';

export default function SpaceLayout() {
  return (
    <Stack>
      {/* 상세 */}
      <Stack.Screen name="[id]" options={{ headerShown: false }} />

      {/* 검색 */}
      <Stack.Screen name="search" options={{ headerShown: false }} />
    </Stack>
  );
}
