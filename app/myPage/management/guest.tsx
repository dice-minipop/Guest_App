import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import InputControllerComponent from '@/components/onBoard/inputController';
import { useGetGuestInfo } from '@/hooks/guest/guest';

type FormData = {
  name: string;
  email: string;
  phone: string;
};

export default function GuestManagement() {
  const router = useRouter();

  // const { data } = useGetGuestInfo();

  const data = useMemo(
    () => ({
      name: '미니팝',
      email: 'dice.minipop@gmail.com',
      phone: '010-1234-5678',
      brandList: [
        {
          id: 1,
          name: '이름이름이름이름이름이름이름이름이름이름이름이름이름이름이름이름이름이름이름이름',
          description:
            '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
          logoUrl: '',
          imageUrls: [],
          homepageUrl: '',
        },
      ],
    }),
    [],
  );

  const { control, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" hasSafeArea={false} title="회원 정보 관리" />

      <KeyboardAwareScrollView
        contentContainerStyle={{
          rowGap: 24,
          paddingHorizontal: 20,
          paddingTop: 32,
          paddingBottom: 64,
        }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <InputControllerComponent
          key="게스트 이름"
          control={control}
          title="게스트 이름"
          name="name"
          placeholder="이름을 입력해주세요"
        />

        <View className="gap-y-[8px]">
          <Text className="CAP1 text-dark_gray">이메일</Text>
          <View className="h-[44px] flex justify-center px-[16px] border border-light_gray rounded-lg bg-back_gray">
            <Text className="BODY2 text-light_gray">{data.email}</Text>
          </View>
        </View>

        <View className="gap-y-[8px]">
          <Text className="CAP1 text-dark_gray">휴대폰</Text>
          <View className="h-[44px] flex justify-center px-[16px] border border-light_gray rounded-lg bg-back_gray">
            <Text className="BODY2 text-light_gray">{data.phone}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/myPage/management/resetPassword')}
          className="bg-white rounded-lg border border-stroke py-[15.5px] mt-[8px]"
        >
          <Text className="BTN1 text-medium_gray text-center">비밀번호 재설정</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
