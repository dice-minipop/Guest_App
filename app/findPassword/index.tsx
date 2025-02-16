import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  SafeAreaView,
  Pressable,
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';

import Icon from '@/components/icon/icon';
import { useRequestResetPassword } from '@/hooks/auth/auth';

const FindPasswordScreen = () => {
  const router = useRouter();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });

  // const { mutateAsync: sendMail } = useRequestResetPassword();
  const sendMail = () => {
    router.push({ pathname: `/findPassword)${profile.email}`, params: { email: profile.email } });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" onTouchEnd={() => Keyboard.dismiss()}>
      <StatusBar style="dark" />
      <View className="flex flex-row justify-between items-center px-1 relative">
        <Pressable onPress={() => router.back()} className="p-3">
          <Icon.BlackLeftArrow />
        </Pressable>

        <Text className="absolute left-1/2 -translate-x-1/2 text-SUB3 font-SUB3 leading-SUB3">
          비밀번호 찾기
        </Text>
      </View>

      <View>
        <KeyboardAvoidingView className="gap-y-8 px-5" onTouchEnd={(e) => e.stopPropagation()}>
          <View className="gap-y-6 pt-8">
            <View className="flex flex-col gap-y-2">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">이름</Text>
              <TextInput
                value={profile.name}
                onChangeText={(text: string) => setProfile({ ...profile, name: text })}
                placeholder="이름을 입력해주세요"
                className="p-4 border border-light_gray rounded-lg text-BODY2 font-BODY2 text-dark_gray"
              />
            </View>

            <View className="flex flex-col gap-y-2">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">이메일 아이디</Text>
              <View className="flex flex-row items-center gap-x-2">
                <TextInput
                  value={profile.email}
                  onChangeText={(text: string) => setProfile({ ...profile, email: text })}
                  placeholder="이메일을 입력해주세요"
                  className={`${false && 'bg-back_gray'} p-4 border border-light_gray rounded-lg flex-1 text-BODY2 font-BODY2 text-dark_gray`}
                />
              </View>
            </View>
          </View>

          <Pressable
            onPress={() => sendMail()}
            disabled={profile.name === '' || profile.email === ''}
            className={`flex items-center px-4 py-[15.5px] rounded-lg ${profile.name !== '' && profile.email !== '' ? 'bg-black' : 'bg-light_gray'} `}
          >
            <Text className="text-BTN1 font-BTN1 leading-BTN1 text-white">
              이메일로 인증번호 받기
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default FindPasswordScreen;
