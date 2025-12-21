import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import CustomPressable from '@/components/common/customPressable/customPressable';
import OpacityPressable from '@/components/common/opacityPressable';
import RegisterForm from '@/components/onBoard/register/registerForm';
import { useSignUp } from '@/hooks/auth/auth';
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
      validate: (value, formValues) => passwordCheckValidate(value, formValues),
    },
    // { title: '휴대폰', name: 'phone', placeholder: '숫자만 입력해주세요', validate: phoneValidate },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterDto>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      phone: '', // 옵셔널이어도 string으로 초기화
    },
  });

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
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" hasSafeArea={false} title="회원가입" />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        bottomOffset={80}
      >
        <RegisterForm formFields={formFields} control={control} errors={errors} />
      </KeyboardAwareScrollView>

      <View className="px-[20px] py-[16px]">
        <OpacityPressable
          onPress={handleSubmit(onSubmit)}
          className={`${isValid ? 'bg-black' : 'bg-light_gray'} py-[15.5px] rounded-lg`}
          disabled={!isValid}
        >
          <Text className="BTN1 text-white text-center">다음</Text>
        </OpacityPressable>
      </View>
    </SafeAreaView>
  );
}
