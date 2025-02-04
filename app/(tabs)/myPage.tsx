import React from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';
import { useLoggedInStore } from '@/zustands/member/store';

// import SafeArea from '@providers/safeArea';

import { deleteToken } from '@/utils/token';
import { useRouter } from 'expo-router';
import Icon from '@/components/icon/icon';
import { StatusBar } from 'expo-status-bar';

// import ProfileImage from '@assets/myPage/defaultProfile.svg';

const MyPageScreen = () => {
  const router = useRouter();

  const { setIsLoggedIn } = useLoggedInStore();

  const name = '미니';

  const handleLogout = () => {
    router.dismissAll();
    router.replace('/');
    setIsLoggedIn(false);
    deleteToken();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="flex-1 gap-y-6">
        <View className="mt-12 flex flex-row items-center gap-x-3 px-5">
          <Icon.Profile />
          <Text className="font-SUB1 text-SUB1 leading-SUB1 text-purple">
            안녕하세요! <Text className="text-black">{name}님</Text>
          </Text>
        </View>

        <View className="h-2 bg-back_gray" />

        <View className="px-5">
          <Pressable onPress={() => router.push('/like')} className="py-3">
            <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">찜한 목록</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/chatBox')} className="py-3">
            <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">쪽지함</Text>
          </Pressable>
        </View>

        <View className="mx-5 h-[1px] bg-stroke" />

        <View className="px-5">
          <Pressable className="py-3">
            <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">
              회원 정보 관리
            </Text>
          </Pressable>
          <Pressable onPress={() => router.push('/(terms)/terms-of-service')} className="py-3">
            <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">이용 약관</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/(terms)/privacy-policy')} className="py-3">
            <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">
              개인정보 처리방침
            </Text>
          </Pressable>
        </View>

        <View className="mx-5 h-[1px] bg-stroke" />

        <View className="px-5">
          <Pressable onPress={handleLogout} className="py-2.5">
            <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">로그아웃</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyPageScreen;
