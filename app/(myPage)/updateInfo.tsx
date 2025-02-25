import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

import LoadingComponent from '@/components/common/loadingComponent';
import Icon from '@/components/icon/icon';
import { useCheckPhoneNumber } from '@/hooks/auth/auth';
import { useGetGuestInfo, useUpdateGuestInfo } from '@/hooks/guest/guest';

const UpdateInfoScreen = () => {
  const router = useRouter();

  const { data, refetch } = useGetGuestInfo();

  const [profile, setProfile] = useState({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });

  const { mutateAsync: updateInfo, isPending: isUpdateInfoPending } = useUpdateGuestInfo(refetch);
  const { mutateAsync: checkPhone, isPending: isCheckPhonePeding } = useCheckPhoneNumber();

  return (
    <SafeAreaView
      className={`flex-1 bg-white ${Platform.OS === 'android' && 'pt-[50px]'}`}
      onTouchEnd={() => Keyboard.dismiss()}
    >
      <StatusBar style="dark" />
      {(isUpdateInfoPending || isCheckPhonePeding) && <LoadingComponent />}
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
                placeholder="이름을 입력해주세요"
                className="p-4 border border-light_gray rounded-lg text-BODY2 font-BODY2 text-dark_gray"
              />
            </View>

            <View className="flex flex-col gap-y-2 px-5">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">이메일</Text>
              <View className="flex flex-row items-center gap-x-2">
                <View className="bg-back_gray p-4 border border-light_gray rounded-lg flex-1">
                  <Text className="text-BODY2 font-BODY2 text-light_gray">{profile.email}</Text>
                </View>
                {/* 이메일 수정 불가 */}
                {/* <TextInput
                  value={profile.email}
                  onChangeText={(text: string) => setProfile({ ...profile, email: text })}
                  editable={false}
                  placeholder="이메일을 입력해주세요"
                  className={`${false && 'bg-back_gray'} p-4 border border-light_gray rounded-lg flex-1 text-BODY2 font-BODY2 text-dark_gray`}
                /> */}
              </View>
            </View>

            <View className="flex flex-col gap-y-2 px-5">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">휴대폰</Text>
              <View className="flex flex-row items-center gap-x-2">
                <TextInput
                  value={profile.phone}
                  onChangeText={(text: string) => setProfile({ ...profile, phone: text })}
                  placeholder="숫자만 입력해주세요"
                  keyboardType="numeric"
                  maxLength={11}
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

          <Pressable
            onPress={() => router.push('/(myPage)/resetPassword')}
            className="mx-5 px-4 py-[15.5px] rounded-lg border border-stroke"
          >
            <Text className="text-BTN1 font-BTN1 leading-BTN1 text-medium_gray text-center">
              비밀번호 재설정
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default UpdateInfoScreen;
