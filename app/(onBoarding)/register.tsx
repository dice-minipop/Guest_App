import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import CTAContainer from '@/components/common/ctaContainer';
import CustomPressable from '@/components/common/customPressable/customPressable';
import RegisterForm from '@/components/onBoard/register/registerForm';
import { useSignUp } from '@/hooks/auth/auth';
import KeyBoardAwareProvider from '@/providers/keyBoardProvider';
import { RegisterDto } from '@/types/auth';
import {
  emailValidate,
  passwordCheckValidate,
  passwordValidate,
  // phoneValidate,
} from '@/utils/validators';

export default function Register() {
  const router = useRouter();

  const formFields: {
    title: string;
    name: keyof RegisterDto;
    placeholder: string;
    validate?: (value: string, formValues: RegisterDto) => true | string | Promise<true | string>;
  }[] = [
    { title: '이름', name: 'name', placeholder: '이름을 입력해주세요' },
    {
      title: '이메일 아이디',
      name: 'email',
      placeholder: '이메일을 입력해주세요',
      validate: emailValidate,
    },
    {
      title: '비밀번호',
      name: 'password',
      placeholder: '비밀번호를 입력해주세요',
      validate: passwordValidate,
    },
    {
      title: '비밀번호 확인',
      name: 'passwordCheck',
      placeholder: '비밀번호를 한번 더 입력해주세요',
      validate: (value, password) => passwordCheckValidate(value, password!),
    },
    // { title: '휴대폰', name: 'phone', placeholder: '숫자만 입력해주세요', validate: phoneValidate },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({ mode: 'onChange' });

  const { mutateAsync: signUp } = useSignUp();

  const onSubmit = async (data: RegisterDto) => {
    await signUp({
      email: data.email,
      name: data.name,
      password: data.password,
      // phone: data.phone,
      userRole: 1,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <BackHeaderComponent style="WHITE" hasSafeArea={false} title="회원가입" />

      <KeyBoardAwareProvider rowGap={11}>
        <RegisterForm formFields={formFields} control={control} errors={errors} />
      </KeyBoardAwareProvider>

      <CTAContainer extraBottom={16}>
        <CustomPressable
          buttonText="다음"
          // onPress={handleSubmit(onSubmit)}
          onPress={() => router.push('/(onBoarding)/brandProfile')}
          disabled={false}
        />
      </CTAContainer>
    </SafeAreaView>
  );
}
