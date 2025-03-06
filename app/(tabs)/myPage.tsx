import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { Suspense } from 'react';
import {
  Text,
  View,
  Pressable,
  SafeAreaView,
  Platform,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';

import LoadingComponent from '@/components/common/loadingComponent';
import Icon from '@/components/icon/icon';
import { useLogout } from '@/hooks/auth/auth';
import { useGetGuestInfo } from '@/hooks/guest/guest';
import { useGuestStateStore } from '@/zustands/member/store';

const MyPageScreen = () => {
  const router = useRouter();

  const { isGuestMode } = useGuestStateStore();

  const { data: guestInfo, isPending } = useGetGuestInfo();

  const { mutateAsync: logout } = useLogout();

  const handleGuestMode = (path: '/myBrand' | '/like' | '/(myPage)/updateInfo') => {
    if (isGuestMode) {
      Alert.alert('게스트로 둘러보기 상태에서는 이용할 수 없습니다!');
    } else {
      router.push(path);
    }
  };

  return (
    <Suspense>
      <View className="flex-1">
        <StatusBar style="light" />
        {isPending && <LoadingComponent />}
        <SafeAreaView className={`flex-1 bg-black ${Platform.OS === 'android' && 'pt-[50px]'}`}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 80, backgroundColor: '#FFFFFF' }}
            bounces={false}
          >
            {guestInfo.brandList.length !== 0 ? (
              <ImageBackground
                source={{
                  uri: guestInfo.brandList[0].logoUrl,
                }}
                className="flex flex-col gap-y-1 pb-4"
                resizeMode="cover"
              >
                <View className="absolute inset-0 bg-black/50" />

                <Pressable onPress={() => router.push('/myBrand')} className="flex self-end">
                  <Icon.Pencil />
                </Pressable>

                <View className="gap-y-4 px-5">
                  <Text className="font-H1 text-H1 leading-H1 text-white">
                    {guestInfo.brandList[0].name}
                  </Text>

                  <Text className="text-BODY2 font-BODY2 leading-BODY2 text-light_gray">
                    {guestInfo.brandList[0].description !== ''
                      ? guestInfo.brandList[0].description
                      : '브랜드를 1~2문장으로 짧게 설명해주세요'}
                  </Text>

                  <ScrollView
                    contentContainerStyle={{ flexDirection: 'row', columnGap: 4 }}
                    horizontal={true}
                    bounces={false}
                  >
                    {guestInfo.brandList[0].imageUrls.length !== 0 ? (
                      guestInfo.brandList[0].imageUrls.map((image, index) => (
                        <Image
                          key={index}
                          source={{ uri: image }}
                          alt="이미지"
                          className="w-20 h-20 rounded-xl border border-white"
                          resizeMode="cover"
                        />
                      ))
                    ) : (
                      <View className="flex flex-row gap-x-1">
                        <View className="w-20 h-20 rounded-xl bg-white" />
                        <View className="w-20 h-20 rounded-xl bg-white" />
                        <View className="w-20 h-20 rounded-xl bg-white" />
                        <View className="w-20 h-20 rounded-xl bg-white" />
                      </View>
                    )}
                  </ScrollView>
                </View>
              </ImageBackground>
            ) : (
              <Pressable
                onPress={() => handleGuestMode('/myBrand')}
                className="flex flex-col gap-y-1 pb-4 bg-black"
              >
                <View className="flex self-end">
                  <Icon.Pencil />
                </View>

                <View className="gap-y-4 px-5">
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
                </View>
              </Pressable>
            )}

            <View className="bg-white flex-1 gap-y-6 pt-6">
              <View className="px-5">
                <Pressable onPress={() => handleGuestMode('/like')} className="py-3">
                  <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">
                    찜한 목록
                  </Text>
                </Pressable>
                <Pressable onPress={() => router.push('/chatBox')} className="py-3">
                  <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">쪽지함</Text>
                </Pressable>
              </View>

              <View className="mx-5 h-[1px] bg-stroke" />

              <View className="px-5">
                <Pressable onPress={() => handleGuestMode('/(myPage)/updateInfo')} className="py-3">
                  <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">
                    회원 정보 관리
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => router.push('/(terms)/terms-of-service')}
                  className="py-3"
                >
                  <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">
                    이용 약관
                  </Text>
                </Pressable>
                <Pressable onPress={() => router.push('/(terms)/privacy-policy')} className="py-3">
                  <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">
                    개인정보 처리방침
                  </Text>
                </Pressable>
              </View>

              <View className="mx-5 h-[1px] bg-stroke" />

              <View className="px-5">
                <Pressable onPress={() => logout()} className="py-3">
                  <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">
                    {isGuestMode ? '게스트로 둘러보기 종료' : '로그아웃'}
                  </Text>
                </Pressable>
              </View>

              {!isGuestMode && (
                <>
                  <View className="h-2 bg-back_gray" />

                  <View className="px-5">
                    <Pressable onPress={() => router.push('/(myPage)/withdraw')} className="py-3">
                      <Text className="font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">
                        탈퇴하기
                      </Text>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Suspense>
  );
};

export default MyPageScreen;
