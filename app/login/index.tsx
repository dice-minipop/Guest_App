import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  View,
  Text,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import CustomButton from '@/components/common/customButton';
import Icon from '@/components/icon/icon';
import UserInput from '@/components/userInput/userInput';
import { useLogin } from '@/hooks/auth/auth';

interface FormData {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { mutateAsync: doLogin } = useLogin(false);

  const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
    if (formData.email === '') {
      Alert.alert('이메일을 입력해주세요');
    }

    if (formData.password === '') {
      Alert.alert('비밀번호를 입력해주세요');
    }

    try {
      await doLogin(formData);
    } catch (error: any) {
      Alert.alert('이메일 또는 비밀번호를 확인해주세요');
    }
  };

  const onError = () => {
    if (errors.email) {
      Alert.alert('입력 오류', errors.email.message);
    } else if (errors.password) {
      Alert.alert('입력 오류', errors.password.message);
    }
  };

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === 'android' && 'pt-[50px]'}`}>
      <StatusBar style="dark" />
      <View className="relative h-full w-full p-5">
        <Pressable className="absolute m-5 z-10" onPress={() => router.back()}>
          <Icon.X />
        </Pressable>
        <View className="flex-1 flex-col justify-center">
          <ScrollView
            bounces={false}
            contentContainerStyle={{ marginVertical: 'auto', rowGap: 32 }}
          >
            <Text className="w-[335px] font-H1 text-H1">로그인</Text>

            <KeyboardAvoidingView
              className="flex flex-col gap-y-3"
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <UserInput
                type="email"
                name="email"
                control={control}
                rules={{ required: '이메일을 입력해주세요' }}
              />

              <UserInput
                type="password"
                name="password"
                control={control}
                rules={{ required: '비밀번호를 입력해주세요' }}
                canAvoid={true}
              />
            </KeyboardAvoidingView>

            <CustomButton
              type="normal"
              onPress={handleSubmit(onSubmit, onError)}
              disabled={false}
              color="black"
              text="로그인"
              textColor="white"
            />

            <Pressable
              onPress={() => router.push('/findPassword')}
              className="px-4 flex self-center"
            >
              <Text className="text-center text-BTN1 font-BTN1 leading-BTN1 text-medium_gray">
                비밀번호 찾기
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
