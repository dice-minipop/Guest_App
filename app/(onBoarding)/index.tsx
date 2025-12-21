import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DiceIcon from '@/assets/icons/onBoarding/icon.svg';
// import SpeechBubble from '@/assets/icons/onBoarding/speechBubble.svg';
import OpacityPressable from '@/components/common/opacityPressable';
import TextButton from '@/components/common/textButton';
import CarouselComponent from '@/components/onBoard/carousel';
// import SocialLoginButton from '@/components/onBoard/socialLogin';
import { useAuthStore } from '@/zustands/auth/auth';

export default function Home() {
  const router = useRouter();

  const { setIsLoggedIn } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      {/* 설명 이미지 Carousel */}
      <CarouselComponent />

      {/* 하단 버튼 Container */}
      <View className="px-[20px] pt-[16px] pb-[8px]">
        <View className="gap-y-[4px]">
          {/* <View className="relative flex items-center justify-center">
            <SpeechBubble />
            <Text className="BTN2 text-center absolute top-[12px]">간편하게 시작하기</Text>
          </View> */}

          <View className="gap-y-[12px]">
            {/* <View className="flex flex-row justify-center items-center gap-x-[16px]">
              <SocialLoginButton type="KAKAO" />
              <SocialLoginButton type="GOOGLE" />
              <SocialLoginButton type="APPLE" />
            </View> */}
            <OpacityPressable
              onPress={() => router.push('/(onBoarding)/login')}
              className="flex flex-row justify-center items-center gap-x-[8px] border border-stroke py-[14px] bg-white rounded-lg"
            >
              <DiceIcon />
              <Text className="BTN1">다이스 아이디로 로그인</Text>
            </OpacityPressable>
          </View>
        </View>

        <View className="mt-[11px] flex flex-row justify-center items-center gap-x-[8px]">
          <TextButton onPress={() => router.push('/(onBoarding)/register')}>
            회원으로 가입하기
          </TextButton>
          <Text className="text-medium_gray">|</Text>
          <TextButton onPress={() => setIsLoggedIn()}>비회원으로 둘러보기</TextButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
