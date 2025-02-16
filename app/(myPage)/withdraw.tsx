import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, View, Text } from 'react-native';

import Icon from '@/components/icon/icon';

const WithdrawScreen = () => {
  const router = useRouter();

  const [reason, setReason] = useState<string>('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row justify-between items-center px-1 relative">
        <Pressable onPress={() => router.back()} className="p-3">
          <Icon.BlackLeftArrow />
        </Pressable>

        <Text className="absolute left-1/2 -translate-x-1/2 text-SUB3 font-SUB3 leading-SUB3">
          탈퇴하기
        </Text>
      </View>

      <View className="px-5 pt-8 gap-y-8">
        <View className="gap-y-2">
          <Text className="text-SUB2 font-SUB2 leading-SUB2">
            OO님과 이별한다니{'\n'}너무 아쉽습니다
          </Text>
          <Text className="text-BODY1 font-BODY1 leading-BODY1 text-medium_gray">
            회원님께서 탈퇴를 원하신다니 저희 서비스가 많이 부족하고 미흡했나 봅니다. 더 나은
            서비스를 제공하는 플랫폼이 될 수 있도록 노력하겠습니다.
          </Text>
        </View>

        <View className="gap-y-2">
          <Text className="text-SUB2 font-SUB2 leading-SUB2">탈퇴 전 확인 부탁드립니다</Text>
          <Text className="text-BODY1 font-BODY1 leading-BODY1 text-medium_gray">
            계정을 삭제하시면 예약, 프로필, 찜, 쪽지 등 모든 활동 정보가 삭제됩니다. 계정 삭제 후
            00일간 재가입할 수 없습니다.
          </Text>
        </View>

        <View className="gap-y-2">
          <Text className="text-SUB3 font-SUB3 leading-SUB3">
            더 나은 다이스가 될 수 있도록{'\n'}탈퇴하시는 이유를 알려주시면 감사하겠습니다
          </Text>
          <Pressable className="rounded-lg border border-light_gray pl-4 flex flex-row justify-between items-center">
            <Text
              className={`text-BODY2 font-BODY2 leading-BODY2 ${reason !== '' ? 'text-black' : 'text-dark_gray'}`}
            >
              {reason !== '' ? reason : '탈퇴하시는 이유가 무엇인가요?'}
            </Text>
            <View className="p-2.5">
              <Icon.BlackDownArrow />
            </View>
          </Pressable>
        </View>
      </View>

      <View className="absolute bottom-[50px] flex flex-row px-5 gap-x-3">
        <Pressable className="rounded-lg bg-white border border-stroke px-4 py-[15.5px] flex-1">
          <Text className="text-BTN1 font-BTN1 leading-BTN1 text-medium_gray text-center">
            취소
          </Text>
        </Pressable>
        <Pressable className="rounded-lg bg-black border border-stroke px-4 py-[15.5px] flex-1">
          <Text className="text-BTN1 font-BTN1 leading-BTN1 text-white text-center">제출</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WithdrawScreen;
