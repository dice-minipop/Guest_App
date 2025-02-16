import { useRouter } from 'expo-router';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { View, Text, Alert, Pressable, ScrollView, SafeAreaView } from 'react-native';

import CustomButton from '@/components/common/customButton';
import EmailInputComponent from '@/components/common/emailInput';
import Icon from '@/components/icon/icon';
import UserInput from '@/components/userInput/userInput';
import { useSignUp } from '@/hooks/auth/auth';

interface FormData {
  id: string;
  password: string;
  password_check: string;
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

  const { mutateAsync: signUp } = useSignUp();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(JSON.stringify(data));

    try {
      await signUp({
        email: data.email,
        name: data.name,
        password: data.password,
        phone: data.phone,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onError = () => {
    if (errors.id) {
      Alert.alert('입력 오류', errors.id.message);
    } else if (errors.password) {
      Alert.alert('입력 오류', errors.password.message);
    } else if (errors.password_check) {
      Alert.alert('입력 오류', errors.password_check.message);
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
            <Text className="my-6 w-[335px] font-H1 text-H1">회원가입</Text>

            <View className="flex flex-col gap-y-6">
              <View className="gap-y-2">
                <Text className="text-CAP1 font-CAP1 leading-CAP1">
                  이름<Text className="text-red">*</Text>
                </Text>
                <UserInput
                  type="name"
                  name="name"
                  control={control}
                  rules={{ required: '이름을 입력해주세요' }}
                />
              </View>

              <View className="gap-y-2">
                <Text className="text-CAP1 font-CAP1 leading-CAP1">
                  이메일 아이디<Text className="text-red">*</Text>
                </Text>
                <EmailInputComponent
                  type="email"
                  name="email"
                  control={control}
                  rules={{ required: '이메일을 입력해주세요' }}
                />
                {/* <UserInput
                  type="email"
                  name="email"
                  control={control}
                  rules={{ required: '이메일을 입력해주세요' }}
                /> */}
              </View>

              <View className="gap-y-2">
                <Text className="text-CAP1 font-CAP1 leading-CAP1">
                  비밀번호<Text className="text-red">*</Text>
                </Text>
                <UserInput
                  type="password"
                  name="password"
                  control={control}
                  rules={{ required: '비밀번호를 입력해주세요' }}
                />
              </View>

              <View className="gap-y-2">
                <Text className="text-CAP1 font-CAP1 leading-CAP1">
                  비밀번호 확인<Text className="text-red">*</Text>
                </Text>
                <UserInput
                  type="password_check"
                  name="password_check"
                  control={control}
                  rules={{ required: '비밀번호를 한 번 더 입력해주세요' }}
                />
              </View>

              <View className="gap-y-2">
                <Text className="text-CAP1 font-CAP1 leading-CAP1">
                  휴대폰<Text className="text-red">*</Text>
                </Text>

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
