import { Control, Controller } from 'react-hook-form';
import { Text, View } from 'react-native';

import CustomTextInput from '@/components/common/customTextInput';
import { LoginDto } from '@/types/auth';

interface LoginFormProps {
  formFields: { name: keyof LoginDto; placeholder: string }[];
  control: Control<LoginDto, any, LoginDto>;
}

export default function LoginForm({ formFields, control }: LoginFormProps) {
  return (
    <View className="gap-y-[32px]">
      <Text className="H1 text-black">로그인</Text>

      <View className="gap-y-[12px]">
        {formFields.map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                value={value}
                setValue={onChange}
                placeholder={item.placeholder}
                isPassword={item.name === 'password'}
              />
            )}
          />
        ))}
      </View>
    </View>
  );
}
