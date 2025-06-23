import { useForm } from 'react-hook-form';
import { Pressable, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import InputControllerComponent from '@/components/onBoard/inputController';
import { useUpdatePassword } from '@/hooks/auth/auth';

type FormData = {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
};

export default function ResetPassword() {
  const formFields: { title: string; name: keyof FormData; placeholder: string }[] = [
    { title: '현재 비밀번호', name: 'currentPassword', placeholder: '비밀번호를 입력해주세요' },
    { title: '새 비밀번호', name: 'newPassword', placeholder: '새 비밀번호를 입력해주세요' },
    {
      title: '새 비밀번호 확인',
      name: 'newPasswordCheck',
      placeholder: '새 비밀번호를 한번 더 입력해주세요',
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { mutateAsync: updatePassword } = useUpdatePassword();

  const onSubmit = async (data: FormData) => {
    await updatePassword({
      password: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" hasSafeArea={false} title="비밀번호 재설정" />

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
        {formFields.map((field) => (
          <InputControllerComponent
            key={field.name}
            control={control}
            title={field.title}
            name={field.name}
            placeholder={field.placeholder}
          />
        ))}

        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-white rounded-lg border border-stroke py-[15.5px] mt-[8px]"
        >
          <Text className="BTN1 text-medium_gray text-center">확인</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
