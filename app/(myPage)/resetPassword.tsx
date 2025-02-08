import Icon from '@/components/icon/icon';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

const ResetPasswordScreen = () => {
  const router = useRouter();

  const [brandData, setBrandData] = useState({
    brandName: '',
    brandDescription: '',
    brandImageList: [],
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row justify-between items-center px-1 relative">
        <Pressable onPress={() => router.back()} className="p-3">
          <Icon.BlackLeftArrow />
        </Pressable>

        <Text className="absolute left-1/2 -translate-x-1/2 text-SUB3 font-SUB3 leading-SUB3">
          나의 브랜드 프로필 편집
        </Text>

        <Pressable className="px-5 py-3.5">
          <Text className="text-BTN1 font-BTN1 leading-BTN1">완료</Text>
        </Pressable>
      </View>

      <View onTouchEnd={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView className="gap-y-8" onTouchEnd={(e) => e.stopPropagation()}>
          <View className="w-screen h-[291px] bg-black flex justify-center items-center">
            <Pressable className="p-4">
              <Icon.Camera />
            </Pressable>
          </View>

          <View className="gap-y-6">
            <View className="flex flex-col gap-y-2 px-5">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">
                내 브랜드 이름
              </Text>
              <TextInput
                value={brandData.brandName}
                onChangeText={(text: string) => setBrandData({ ...brandData, brandName: text })}
                placeholder="브랜드 이름을 입력해주세요"
                className="p-4 border border-light_gray rounded-lg"
              />
            </View>

            <View className="flex flex-col gap-y-2 px-5">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">
                짧은 브랜드 소개
              </Text>
              <TextInput
                value={brandData.brandDescription}
                onChangeText={(text: string) =>
                  setBrandData({ ...brandData, brandDescription: text })
                }
                multiline
                placeholder="팝업 공간을 대여해주는 호스트와 신뢰할 수 있는 거래를 위해 브랜드를 1~2문장으로 짧게 설명해주세요"
                className="p-4 border border-light_gray rounded-lg min-h-[98px]"
              />
            </View>

            <View className="flex flex-col gap-y-2 px-5">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">
                브랜드, 상품 관련 이미지 (최대 10장)
              </Text>
              <View className="flex flex-row items-center">
                <Pressable className="flex flex-col justify-center items-center gap-y-0.5 border border-light_gray rounded-xl w-20 h-20">
                  <Icon.Plus />
                  <Text className="text-CAP2 font-CAP2 leading-CAP2 text-medium_gray">
                    <Text className="text-purple">{brandData.brandImageList.length}</Text> / 10
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
