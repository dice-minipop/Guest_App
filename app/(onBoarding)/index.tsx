import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomPressableComponent from '@/components/common/customPressable';
import CarouselComponent from '@/components/onBoard/carousel';

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <CarouselComponent />

      <View className="pb-[20px] pt-[16px] absolute bottom-[40px] w-full z-10">
        <CustomPressableComponent
          buttonText="다이스 아이디로 로그인"
          onPress={() => router.push('/findPassword')}
          disabled={false}
          color={'BLACK'}
          icon={'DICE'}
        />

        <View className="mt-[11px] flex flex-row justify-center items-center gap-x-[8px]">
          <Pressable onPress={() => router.push('/register')} disabled={false}>
            <View className="px-[16px] py-[13.5px]">
              <Text className="BTN1 text-medium_gray underline text-center">회원으로 가입하기</Text>
            </View>
          </Pressable>

          <Text className="text-medium_gray">|</Text>

          <Pressable onPress={() => router.push('/(tabs)/space')} disabled={false}>
            <View className="px-[16px] py-[13.5px]">
              <Text className="BTN1 text-medium_gray underline text-center">
                비회원으로 둘러보기
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
