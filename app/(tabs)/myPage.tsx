import React from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';
import { useLoggedInStore } from '@/zustands/member/store';

import { deleteToken } from '@/utils/token';
import { useRouter } from 'expo-router';
import Icon from '@/components/icon/icon';
import { useGetGuestInfo } from '@/hooks/guest/guest';
import { logout } from '@/server/auth/auth';
import { StatusBar } from 'expo-status-bar';

const MyPageScreen = () => {
  const router = useRouter();

  const { setIsLoggedIn } = useLoggedInStore();

  const { data: guestInfo } = useGetGuestInfo();

  const handleLogout = async () => {
    router.dismissAll();
    router.replace('/');
    setIsLoggedIn(false);
    await logout();
    deleteToken();
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 bg-black">
        {guestInfo.brandList.length !== 0 ? (
          <View className="flex flex-col gap-y-1 pb-4 bg-black">
            <Pressable className="flex self-end">
              <Icon.Pencil />
            </Pressable>

            <Pressable onPress={() => router.push('/myBrand')} className="gap-y-4 px-5">
              <Text className="font-H1 text-H1 leading-H1 text-white">
                {guestInfo.brandList[0].name}
              </Text>

              <View>
                <Text className="text-BODY2 font-BODY2 leading-BODY2 text-light_gray">
                  {guestInfo.brandList[0].name}
                </Text>
                <Text className="text-BODY2 font-BODY2 leading-BODY2 text-light_gray">
                  브랜드를 1~2문장으로 짧게 설명해주세요
                </Text>
              </View>

              <View className="flex flex-row gap-x-1">
                <View className="w-20 h-20 rounded-xl bg-white" />
                <View className="w-20 h-20 rounded-xl bg-white" />
                <View className="w-20 h-20 rounded-xl bg-white" />
                <View className="w-20 h-20 rounded-xl bg-white" />
                <View className="w-20 h-20 rounded-xl bg-white" />
              </View>
            </Pressable>
          </View>
        ) : (
          <View className="flex flex-col gap-y-1 pb-4 bg-black">
            <Pressable className="flex self-end">
              <Icon.Pencil />
            </Pressable>

            <Pressable onPress={() => router.push('/myBrand')} className="gap-y-4 px-5">
              <Text className="font-H1 text-H1 leading-H1 text-white">
                브랜드 프로필을 작성해주세요
              </Text>

              <View>
                <Text className="text-BODY2 font-BODY2 leading-BODY2 text-light_gray">
                  팝업 공간을 대여해주는 호스트와 신뢰할 수 있는 거래를 위해
                </Text>
                <Text className="text-BODY2 font-BODY2 leading-BODY2 text-light_gray">
                  브랜드를 1~2문장으로 짧게 설명해주세요
                </Text>
              </View>

              <View className="flex flex-row gap-x-1">
                <View className="w-20 h-20 rounded-xl bg-white" />
                <View className="w-20 h-20 rounded-xl bg-white" />
                <View className="w-20 h-20 rounded-xl bg-white" />
                <View className="w-20 h-20 rounded-xl bg-white" />
                <View className="w-20 h-20 rounded-xl bg-white" />
              </View>
            </Pressable>
          </View>
        )}

        <View className="bg-white flex-1 gap-y-6 pt-6">
          <View className="px-5">
            <Pressable onPress={() => router.push('/like')} className="py-3">
              <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">예약한 공간</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/like')} className="py-3">
              <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">찜한 목록</Text>
            </Pressable>
            {/* <Pressable onPress={() => router.push('/chatBox')} className="py-3">
              <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">쪽지함</Text>
            </Pressable> */}
          </View>

          <View className="mx-5 h-[1px] bg-stroke" />

          <View className="px-5">
            <Pressable onPress={() => router.push('/(myPage)/updateInfo')} className="py-3">
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
    </View>
  );
};

export default MyPageScreen;
