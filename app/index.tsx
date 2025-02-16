import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';

import { GuestGetAxiosInstance } from '@/axios/guest.axios.method';
import Icon from '@/components/icon/icon';
import { useLoggedInStore } from '@/zustands/member/store';

const HomeScreen = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useLoggedInStore();

  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleLoggedIn = () => {
    router.push('/(tabs)/space');
    setIsLoggedIn(true);
  };

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const descriptionItem = [
    {
      title: '원하는 팝업 공간, 쉽고 빠르게 찾기',
      description:
        '원하는 조건을 설정할 수 있는 필터를 통해\n효율적으로 공간 정보를 탐색하고 예약해요.',
    },
    {
      title: '맞춤 팝업스토어 지원공고, 한눈에 찾기',
      description: '국내 모든 소상공인·자영업자 대상\n팝업스토어 운영 지원 공고를 모아 보여드려요.',
    },
    {
      title: '쪽지와 예약으로,\n호스트와 쉽게 연락하기',
      description:
        '원하는 팝업 공간을 제공하는 호스트와 쪽지를 통해\n직접 연락하고, 캘린더로 일정에 맞춰 예약 가능해요.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % descriptionItem.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className="flex-1 flex items-center relative bg-white px-5">
      <View className="absolute bottom-[34px] w-full">
        <View className="gap-y-8 pt-8 pb-4">
          <View className="flex flex-row justify-center gap-x-3">
            {descriptionItem.map((_, index) => (
              <View key={index}>
                {index === currentIndex ? <Icon.BlackIndicator /> : <Icon.GrayIndicator />}
              </View>
            ))}
          </View>

          <View className="gap-y-2">
            <Text className="text-SUB1 font-SUB1 leading-SUB1 text-center h-[56px]">
              {descriptionItem[currentIndex].title}
            </Text>
            <Text className="text-SUB3 font-SUB3 leading-SUB3 text-center text-medium_gray">
              {descriptionItem[currentIndex].description}
            </Text>
          </View>
        </View>

        <View className="pb-5 pt-4 px-5">
          <Pressable
            onPress={() => router.push('/login')}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            className={`rounded-lg bg-black flex flex-row justify-center items-center gap-x-2 p-4 ${isPressed && 'opacity-50'}`}
          >
            <Icon.Dice />
            <Text className="text-white text-BTN1 font-BTN1 leading-BTN1">
              다이스 아이디로 로그인
            </Text>
          </Pressable>

          <View className="mt-[11px] flex flex-row justify-center gap-x-2 p-4">
            <Pressable onPress={() => router.push('/register')}>
              <Text className="font-BTN1 text-BTN1 text-medium_gray underline">
                회원으로 가입하기
              </Text>
            </Pressable>
            <Text className="text-medium_gray">|</Text>
            <Pressable onPress={handleLoggedIn}>
              <Text className="font-BTN1 text-BTN1 text-medium_gray underline">
                비회원으로 둘러보기
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
