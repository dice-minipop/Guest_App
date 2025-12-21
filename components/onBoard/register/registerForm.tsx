import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import CustomTextInput from '@/components/common/customTextInput';
import { RegisterDto } from '@/types/auth';

interface RegisterFormProps {
  formFields: {
    title: string;
    name: keyof RegisterDto;
    placeholder: string;
    validate?: (value: string, formValues: RegisterDto) => true | string | Promise<true | string>;
  }[];
  control: Control<RegisterDto, any, RegisterDto>;
  errors: FieldErrors<RegisterDto>;
}

const successMessages: Record<keyof RegisterDto, string> = {
  name: '', // 이름은 성공 메시지 없음
  email: '사용 가능한 이메일입니다.',
  password: '사용 가능한 비밀번호입니다.',
  passwordCheck: '동일한 비밀번호입니다.',
  phone: '사용 가능한 휴대폰 번호입니다.',
};

export default function RegisterForm({ formFields, control, errors }: RegisterFormProps) {
  return (
    <View className="gap-y-[32px] pt-[32px]">
      <Text className="H1 text-black">회원 정보를 입력해주세요</Text>

      <View className="gap-y-[24px]">
        {formFields.map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            rules={{
              required: `${item.title}은(는) 필수 입력입니다.`,
              validate: item.validate,
            }}
            render={({ field: { onChange, value } }) => {
              const errorMessage = errors[item.name]?.message as string | undefined;
              const successMessage = !errorMessage && value ? successMessages[item.name] : '';

              return (
                <View>
                  <Text className="CAP1 text-dark_gray mb-[8px] ml-[4px]">
                    {item.title}
                    <Text className="text-red">*</Text>
                  </Text>

                  <CustomTextInput
                    value={value}
                    setValue={onChange}
                    placeholder={item.placeholder}
                    isPassword={item.name === 'password' || item.name === 'passwordCheck'}
                  />

                  <Text
                    className={`CAP2 mt-[4px] ml-[4px] ${
                      errorMessage ? 'text-red' : successMessage ? 'text-green' : 'hidden'
                    }`}
                  >
                    {errorMessage || successMessage}
                  </Text>
                </View>
              );
            }}
          />
        ))}
      </View>
    </View>
  );
}
