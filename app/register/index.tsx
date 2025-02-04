import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { View, Text, Alert, Pressable, ScrollView, SafeAreaView } from 'react-native';

import UserInput from '@/components/userInput/userInput';
import CustomButton from '@/components/common/customButton';
import { useRouter } from 'expo-router';
import Icon from '@/components/icon/icon';

interface FormData {
  id: string;
  passwd: string;
  passwd_check: string;
  name: string;
  email: string;
  phone: string;
}

const RegisterScreen = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(JSON.stringify(data));
  };

  const onError = () => {
    if (errors.id) {
      Alert.alert('입력 오류', errors.id.message);
    } else if (errors.passwd) {
      Alert.alert('입력 오류', errors.passwd.message);
    } else if (errors.passwd_check) {
      Alert.alert('입력 오류', errors.passwd_check.message);
    } else if (errors.name) {
      Alert.alert('입력 오류', errors.name.message);
    } else if (errors.email) {
      Alert.alert('입력 오류', errors.email.message);
    } else if (errors.phone) {
      Alert.alert('입력 오류', errors.phone.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative h-full w-full p-5">
        <Pressable className="absolute m-5" onPress={() => router.back()}>
          <Icon.X />
        </Pressable>
        <View className="mt-8 flex-1 flex-col justify-center">
          <ScrollView>
            <View className="flex flex-col">
              <Text className="my-6 w-[335px] font-H1 text-H1">회원가입</Text>
              <View className="mb-6">
                <View className="mb-2 flex flex-row">
                  <Text className="font-CAP1 text-CAP1">아이디</Text>
                  <Text className="font-CAP1 text-CAP1 text-red">*</Text>
                </View>
                <UserInput
                  type="id"
                  name="id"
                  control={control}
                  rules={{ required: '아이디를 입력해주세요' }}
                />
              </View>
              <View className="mb-6">
                <View className="mb-2 flex flex-row">
                  <Text className="font-CAP1 text-CAP1">비밀번호</Text>
                  <Text className="font-CAP1 text-CAP1 text-red">*</Text>
                </View>
                <UserInput
                  type="passwd"
                  name="passwd"
                  control={control}
                  rules={{ required: '비밀번호를 입력해주세요' }}
                />
              </View>
              <View className="mb-6">
                <View className="mb-2 flex flex-row">
                  <Text className="font-CAP1 text-CAP1">비밀번호 확인</Text>
                  <Text className="font-CAP1 text-CAP1 text-red">*</Text>
                </View>
                <UserInput
                  type="passwd_check"
                  name="passwd_check"
                  control={control}
                  rules={{ required: '비밀번호를 한 번 더 입력해주세요' }}
                />
              </View>
              <View className="mb-6">
                <View className="mb-2 flex flex-row">
                  <Text className="font-CAP1 text-CAP1">이름</Text>
                  <Text className="font-CAP1 text-CAP1 text-red">*</Text>
                </View>
                <UserInput
                  type="name"
                  name="name"
                  control={control}
                  rules={{ required: '이름을 입력해주세요' }}
                />
              </View>
              <View className="mb-6">
                <View className="mb-2 flex flex-row">
                  <Text className="font-CAP1 text-CAP1">이메일</Text>
                  <Text className="font-CAP1 text-CAP1 text-red">*</Text>
                </View>
                <UserInput
                  type="email"
                  name="email"
                  control={control}
                  rules={{ required: '이메일을 입력해주세요' }}
                />
              </View>
              <View className="mb-6">
                <View className="mb-2 flex flex-row">
                  <Text className="font-CAP1 text-CAP1">휴대폰</Text>
                  <Text className="font-CAP1 text-CAP1 text-red">*</Text>
                </View>
                <UserInput
                  type="phone"
                  name="phone"
                  control={control}
                  rules={{ required: '휴대폰 번호를 입력해주세요' }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <CustomButton
          type="normal"
          onPress={handleSubmit(onSubmit, onError)}
          disabled={false}
          color="black"
          text="회원가입"
          textColor="white"
        />
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
