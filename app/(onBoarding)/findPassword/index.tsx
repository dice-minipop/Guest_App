import { useForm, useWatch } from 'react-hook-form';
import { Pressable, Text, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import InputControllerComponent from '@/components/onBoard/inputController';
import { useDomainModalStore } from '@/zustands/onBoard/store';

type FormData = {
  name: string;
  email: string;
};

export default function FindPassword() {
  const formFields: { title: string; name: keyof FormData; placeholder: string }[] = [
    { title: '이름', name: 'name', placeholder: '이름을 입력해주세요' },
    { title: '이메일 아이디', name: 'email', placeholder: '예: dice16' },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const name = useWatch({ control, name: 'name' });
  const email = useWatch({ control, name: 'email' });

  const { setIsDomainModalOpen } = useDomainModalStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" hasSafeArea={false} title="비밀번호 찾기" />

      <TouchableWithoutFeedback onPress={() => setIsDomainModalOpen(false)}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            rowGap: 24,
            paddingBottom: 64,
            paddingTop: 24,
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
              shouldValidate={false}
            />
          ))}

          <Pressable className={`${!!name && !!email ? 'bg-black' : 'bg-light_gray'}`}>
            <Text>이메일로 인증번호 받기</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
