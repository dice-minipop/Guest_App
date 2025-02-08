import Icon from '@/components/icon/icon';
import { useCheckEmail, useCheckPhoneNumber } from '@/hooks/auth/auth';
import { useGetGuestInfo, useUpdateGuestInfo } from '@/hooks/guest/guest';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
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

const UpdateInfoScreen = () => {
  const router = useRouter();

  const { data } = useGetGuestInfo();

  const [profile, setProfile] = useState({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });

  const { mutateAsync: updateInfo } = useUpdateGuestInfo();
  const { mutateAsync: checkPhone } = useCheckPhoneNumber();
  const { mutateAsync: checkEmail } = useCheckEmail();

  return (
    <SafeAreaView className="flex-1 bg-white" onTouchEnd={() => Keyboard.dismiss()}>
      <StatusBar style="dark" />
      <View className="flex flex-row justify-between items-center px-1 relative">
        <Pressable onPress={() => router.back()} className="p-3">
          <Icon.BlackLeftArrow />
        </Pressable>

        <Text className="absolute left-1/2 -translate-x-1/2 text-SUB3 font-SUB3 leading-SUB3">
          회원 정보 관리
        </Text>

        <Pressable onPress={() => updateInfo(profile)} className="px-5 py-3.5">
          <Text className="text-BTN1 font-BTN1 leading-BTN1">완료</Text>
        </Pressable>
      </View>

      <View>
        <KeyboardAvoidingView className="gap-y-8" onTouchEnd={(e) => e.stopPropagation()}>
          <View className="gap-y-6 pt-8">
            <View className="flex flex-col gap-y-2 px-5">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">게스트 이름</Text>
              <TextInput
                value={profile.name}
                onChangeText={(text: string) => setProfile({ ...profile, name: text })}
                placeholder="브랜드 이름을 입력해주세요"
                className="p-4 border border-light_gray rounded-lg text-BODY2 font-BODY2 text-dark_gray"
              />
            </View>

            <View className="flex flex-col gap-y-2 px-5">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">이메일</Text>
              <View className="flex flex-row items-center gap-x-2">
                <TextInput
                  value={profile.email}
                  onChangeText={(text: string) => setProfile({ ...profile, email: text })}
                  placeholder="브랜드 이름을 입력해주세요"
                  className="p-4 border border-light_gray rounded-lg flex-1 text-BODY2 font-BODY2 text-dark_gray"
                />
                <Pressable
                  onPress={() => checkEmail({ email: profile.email })}
                  disabled={profile.email === data.email || !profile.email}
                  className="px-10 py-3.5 border border-light_gray rounded-lg"
                >
                  <Text className="text-BTN1 font-BTN1 leading-BTN1 text-light_gray">
                    중복 확인
                  </Text>
                </Pressable>
              </View>
            </View>

            <View className="flex flex-col gap-y-2 px-5">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">휴대폰</Text>
              <View className="flex flex-row items-center gap-x-2">
                <TextInput
                  value={profile.phone}
                  onChangeText={(text: string) => setProfile({ ...profile, phone: text })}
                  placeholder="브랜드 이름을 입력해주세요"
                  className="p-4 border border-light_gray rounded-lg flex-1 text-BODY2 font-BODY2 text-dark_gray"
                />
                <Pressable
                  onPress={() => checkPhone({ phone: profile.phone })}
                  disabled={profile.phone === data.phone || !profile.phone}
                  className="px-10 py-3.5 border border-light_gray rounded-lg"
                >
                  <Text className="text-BTN1 font-BTN1 leading-BTN1 text-light_gray">
                    중복 확인
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

export default UpdateInfoScreen;
