import React from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { useLoggedInStore } from '@/zustands/member/store';

import CustomButton from '@/components/common/customButton';
import { useRouter } from 'expo-router';
import Icon from '@/components/icon/icon';

// import Logo from "@assets/topNavigation/logo-black.svg";

const HomeScreen = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useLoggedInStore();

  const handleLoggedIn = () => {
    router.push('/(tabs)/space');
    setIsLoggedIn(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-1 flex-col items-center justify-center gap-y-4">
        <Icon.Logo />
        <Text className="font-SUB2 text-SUB2">팝업 운영 올인원 솔루션</Text>
      </View>

      <View className="px-5">
        <CustomButton
          type="normal"
          onPress={() => router.push('/login')}
          disabled={false}
          color="black"
          text="다이스 아이디로 로그인"
          textColor="white"
        />
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
    </SafeAreaView>
  );
};

export default HomeScreen;
