import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Text, Pressable, SafeAreaView, View } from 'react-native';

import Icon from '@/components/icon/icon';

const FindPasswordSuccessScreen = () => {
  const router = useRouter();

  const { email } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row justify-between items-center px-1 relative">
        <Pressable onPress={() => router.back()} className="p-3">
          <Icon.BlackLeftArrow />
        </Pressable>

        <Text className="absolute left-1/2 -translate-x-1/2 text-SUB3 font-SUB3 leading-SUB3">
          비밀번호 찾기
        </Text>
      </View>

      <View className="m-auto">
        <Text className="text-center text-BODY1 font-BODY1 leading-BODY1 text-deep_gray">
          <Text className="text-SUB2 font-SUB2 leading-SUB2 text-black">{email}</Text>으로
          {'\n'}
          비밀번호 재설정 메일이 발송되었습니다.
        </Text>
      </View>

      <Pressable
        onPress={() => router.replace('/')}
        // disabled={profile.name === '' || profile.email === ''}
        className="flex items-center mx-5 mt-4 mb-[30px] px-4 py-[15.5px] rounded-lg bg-black"
      >
        <Text className="text-BTN1 font-BTN1 leading-BTN1 text-white">확인</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default FindPasswordSuccessScreen;
