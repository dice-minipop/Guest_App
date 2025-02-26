import React, { useState } from 'react';
import { Path, Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { View, TextInput, Pressable, TextInputProps, Text } from 'react-native';

import { useCheckPhoneNumber } from '@/hooks/auth/auth';

import Icon from '../icon/icon';

interface UserInputProps<T extends FieldValues> extends TextInputProps {
  type: 'password' | 'password_check' | 'name' | 'email' | 'phone' | 'auth';
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

const UserInput = <T extends FieldValues>({ type, name, control, rules }: UserInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswdVissible, setIsPasswdVissible] = useState<boolean>(false);

  const { mutate: checkPhoneNumber, isError: isPhoneError } = useCheckPhoneNumber();

  const placeholder = {
    password: '비밀번호를 입력해주세요',
    password_check: '비밀번호를 한 번 더 입력해주세요',
    name: '이름을 입력해주세요',
    email: '이메일 아이디를 입력해주세요',
    phone: '숫자만 입력해주세요',
    auth: '인증번호 받기',
  };

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const passwordRules: RegisterOptions<T, Path<T>> = {
    required: '비밀번호를 입력해주세요',
    minLength: { value: 8, message: '최소 8자 이상 입력해야 합니다.' },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      message: '영문, 숫자, 특수문자만 허용되며, 3개 모두 사용해야 합니다.',
    },
    validate: (value) =>
      isValidPassword(value) || '비밀번호는 8자 이상 / 영문, 숫자, 특수문자를 포함해야 합니다.',
  };

  const phoneRules: RegisterOptions<T, Path<T>> = {
    required: '전화번호를 입력해주세요.',
    pattern: {
      value: /^010\d{8}$/,
      message: '올바른 휴대폰 번호를 입력해주세요.',
    },
    validate: (value) => {
      checkPhoneNumber({ phone: value });

      if (isPhoneError) {
        return '중복된 휴대폰 번호입니다.';
      }
      return true;
    },
  };

  return (
    <View className="relative w-full">
      <Controller
        name={name}
        control={control}
        rules={type === 'password' ? passwordRules : type === 'phone' ? phoneRules : rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View>
            <View className="flex min-h-11 flex-row items-center gap-x-2">
              <View
                className={`flex-1 border rounded-lg relative ${error ? 'border-red' : isFocused ? 'border-black' : 'border-light_gray'}`}
              >
                <TextInput
                  className={`flex-1 p-4 text-BODY2 font-BODY2 min-h-11`}
                  autoCapitalize="none"
                  secureTextEntry={
                    (type === 'password' || type === 'password_check') && !isPasswdVissible
                      ? true
                      : false
                  }
                  placeholder={placeholder[type]}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setIsFocused(false);
                    onBlur();
                  }}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  maxLength={type === 'phone' ? 11 : undefined}
                />
                {value ? (
                  <Pressable
                    onPress={() => onChange('')}
                    className={`absolute ${
                      type === 'password' || type === 'password_check' ? 'right-10' : 'right-0'
                    } top-1 m-3`}
                  >
                    <Icon.Delete />
                  </Pressable>
                ) : null}
                {type === 'password' || type === 'password_check' ? (
                  <Pressable
                    onPress={() => setIsPasswdVissible(!isPasswdVissible)}
                    className="absolute right-0 top-1 m-3"
                  >
                    {isPasswdVissible ? <Icon.EyeOn /> : <Icon.EyeOff />}
                  </Pressable>
                ) : null}
              </View>
            </View>
            {(type === 'password' || type === 'phone' || type === 'password_check') && error && (
              <Text className="text-CAP2 font-CAP2 leading-CAP2 text-red mt-1 ml-2">
                {error.message}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default UserInput;
