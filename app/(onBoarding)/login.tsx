import { useRouter } from 'expo-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import XIcon from '@/assets/icons/x.svg';
import CustomPressable from '@/components/common/customPressable/customPressable';
import TextButton from '@/components/common/textButton';
import LoginForm from '@/components/onBoard/login/loginForm';
import { useLogin } from '@/hooks/auth/auth';
import KeyBoardAwareProvider from '@/providers/keyBoardProvider';
import { LoginDto } from '@/types/auth';

export default function Login() {
  const router = useRouter();

  const formFields: { name: keyof LoginDto; placeholder: string }[] = [
    { name: 'email', placeholder: '이메일 아이디를 입력해주세요' },
    { name: 'password', placeholder: '비밀번호를 입력해주세요' },
  ];

  const { control, handleSubmit } = useForm<LoginDto>();

  const { mutateAsync: login } = useLogin(false);

  const onSubmit: SubmitHandler<LoginDto> = async (data: LoginDto) => {
    await login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity onPress={() => router.back()} className="self-start p-[12px] ml-[3px]">
        <XIcon />
      </TouchableOpacity>

      <KeyBoardAwareProvider rowGap={32} isCenter={true}>
        <LoginForm formFields={formFields} control={control} />

        <View className="gap-y-3">
          <CustomPressable buttonText="로그인" onPress={handleSubmit(onSubmit)} disabled={false} />
          <TextButton onPress={() => router.push('/(onBoarding)/findPassword')}>
            비밀번호 찾기
          </TextButton>
        </View>
      </KeyBoardAwareProvider>
    </SafeAreaView>
  );
}
