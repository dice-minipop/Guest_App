import { useRouter } from 'expo-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import XIcon from '@/assets/icons/x.svg';
import CustomPressableComponent from '@/components/common/customPressable';
import LoginInputControllerComponent from '@/components/onBoard/loginInputController';
import { useLogin } from '@/hooks/auth/auth';
import { useDomainModalStore } from '@/zustands/onBoard/store';

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const { setIsDomainModalOpen } = useDomainModalStore();

  const formFields: { name: keyof FormData; placeholder: string }[] = [
    { name: 'email', placeholder: '이메일 아이디를 입력해주세요' },
    { name: 'password', placeholder: '비밀번호를 입력해주세요' },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { mutateAsync: login } = useLogin(false);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    await login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Pressable onPress={() => router.back()} className="self-start p-[12px] ml-[3px]">
        <XIcon />
      </Pressable>

      <TouchableWithoutFeedback onPress={() => setIsDomainModalOpen(false)}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ rowGap: 32, marginVertical: 'auto', paddingBottom: 48 }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={20}
        >
          <View className="px-[20px] gap-y-[32px]">
            <Text className="H1 text-black">로그인</Text>
            <View className="gap-y-[12px]">
              {formFields.map((field) => (
                <LoginInputControllerComponent
                  key={field.name}
                  control={control}
                  name={field.name}
                  placeholder={field.placeholder}
                />
              ))}
            </View>
          </View>

          <View className="gap-y-[11px]">
            <CustomPressableComponent
              buttonText="로그인"
              onPress={handleSubmit(onSubmit)}
              disabled={false}
            />
            <Pressable className="self-center px-[16px] py-[13.5px]">
              <Text className="BTN1 text-medium_gray">비밀번호 찾기</Text>
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
