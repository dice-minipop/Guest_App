import React, { useEffect, useState } from 'react';
import { Path, Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { View, TextInput, Pressable, TextInputProps, Text } from 'react-native';

import { useCheckPhoneNumber } from '@/hooks/auth/auth';

import Icon from '../icon/icon';

interface UserInputProps<T extends FieldValues> extends TextInputProps {
  type: 'password' | 'password_check' | 'name' | 'email' | 'phone' | 'auth';
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
}

const UserInput = <T extends FieldValues>({ type, name, control, rules }: UserInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswdVissible, setIsPasswdVissible] = useState<boolean>(false);

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

  // const email_message = '이미 가입된 이메일입니다.' || '사용 가능한 이메일입니다.';

  //   const password_message =
  //     '비밀번호는 8자 이상 / 영문, 숫자, 특수문자를 포함해야 합니다.' ||
  //     '사용 가능한 비밀번호입니다.';

  // const password_check_message = '동일한 비밀번호를 입력해야 합니다.' || '동일한 비밀번호입니다.';

  // const phone_message = '중복된 휴대폰 번호입니다.' || '사용 가능한 휴대폰 번호입니다.';

  const { mutateAsync: checkPhone } = useCheckPhoneNumber();

  return (
    <View className="relative w-full">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <View className="flex min-h-11 flex-row items-center gap-x-2">
              <View
                className={`flex-1 border rounded-lg relative ${isFocused ? 'border-black' : 'border-light_gray'}`}
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
                  onChangeText={onChange}
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
              {type === 'phone' && (
                <Pressable
                  onPress={() => checkPhone({ phone: value })}
                  disabled={!value}
                  className={`px-7 py-3.5 border rounded-lg ${value ? 'border-black' : 'border-light_gray'}`}
                >
                  <Text
                    className={`text-BTN1 font-BTN1 leading-BTN1 ${value ? 'text-black' : 'text-light_gray'}`}
                  >
                    중복 확인
                  </Text>
                </Pressable>
              )}
            </View>
            {/* {type === 'email' && <Text className="mt-1">이메일</Text>}
            {type === 'password' && <Text className="mt-1">비밀번호</Text>}
            {type === 'password_check' && <Text className="mt-1">비밀번호 확인</Text>}
            {type === 'phone' && <Text className="mt-1">휴대폰</Text>} */}
          </View>
        )}
      />
    </View>
  );
};

export default UserInput;
