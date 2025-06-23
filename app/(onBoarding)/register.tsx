import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, Text, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import XIcon from '@/assets/icons/x.svg';
import CustomPressableComponent from '@/components/common/customPressable';
import InputControllerComponent from '@/components/onBoard/inputController';
import { useSignUp } from '@/hooks/auth/auth';
import { useDomainModalStore } from '@/zustands/onBoard/store';

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
  phone: string;
};

export default function Register() {
  const formFields: { title: string; name: keyof FormData; placeholder: string }[] = [
    { title: '이름', name: 'name', placeholder: '이름을 입력해주세요' },
    { title: '이메일 아이디', name: 'email', placeholder: '예: dice16' },
    { title: '비밀번호', name: 'password', placeholder: '비밀번호를 입력해주세요' },
    {
      title: '비밀번호 확인',
      name: 'passwordCheck',
      placeholder: '비밀번호를 한번 더 입력해주세요',
    },
    { title: '휴대폰', name: 'phone', placeholder: '숫자만 입력해주세요' },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { mutateAsync: signUp } = useSignUp();

  const onSubmit = async (data: FormData) => {
    await signUp({
      email: data.email,
      name: data.name,
      password: data.password,
      phone: data.phone,
      userRole: 1,
    });
  };

  const { setIsDomainModalOpen } = useDomainModalStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Pressable onPress={() => router.back()} className="self-start p-[12px] ml-[3px]">
        <XIcon />
      </Pressable>

      <TouchableWithoutFeedback onPress={() => setIsDomainModalOpen(false)}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ paddingHorizontal: 20, rowGap: 24, paddingBottom: 64 }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={20}
        >
          <Text className="H1 text-black mt-[32px] mb-[8px]">회원가입</Text>
          {formFields.map((field) => (
            <InputControllerComponent
              key={field.name}
              control={control}
              title={field.title}
              name={field.name}
              placeholder={field.placeholder}
            />
          ))}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

      <CustomPressableComponent
        buttonText="회원가입"
        onPress={handleSubmit(onSubmit)}
        disabled={false}
      />
    </SafeAreaView>
  );
}
