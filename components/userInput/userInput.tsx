import React, { useState } from 'react';
import { View, TextInput, Pressable, TextInputProps } from 'react-native';
import { Path, Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';

// import EyeOn from '@assets/input/eye-on.svg';
// import Delete from '@assets/input/delete.svg';
// import EyeOff from '@assets/input/eye-off.svg';

interface UserInputProps<T extends FieldValues> extends TextInputProps {
  type: 'id' | 'passwd' | 'passwd_check' | 'name' | 'email' | 'phone' | 'auth';
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
}

const UserInput = <T extends FieldValues>({ type, name, control, rules }: UserInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswdVissible, setIsPasswdVissible] = useState<boolean>(false);

  const placeholder = {
    id: '아이디를 입력해주세요',
    passwd: '비밀번호를 입력해주세요',
    passwd_check: '비밀번호를 한 번 더 입력해주세요',
    name: '이름을 입력해주세요',
    email: '예: popupdice',
    phone: '숫자만 입력해주세요',
    auth: '인증번호 받기',
  };

  return (
    <View className="relative h-11 w-full">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              className={`h-full w-full rounded-lg border p-4  ${
                isFocused ? 'border-black' : 'border-light_gray'
              }`}
              autoCapitalize="none"
              secureTextEntry={
                (type === 'passwd' || type === 'passwd_check') && !isPasswdVissible ? true : false
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
                  type === 'passwd' || type === 'passwd_check' ? 'right-10' : 'right-0'
                } top-0 m-3`}
              >
                {/* <Delete width={18} height={18} /> */}
              </Pressable>
            ) : null}
            {type === 'passwd' || type === 'passwd_check' ? (
              <Pressable
                onPress={() => setIsPasswdVissible(!isPasswdVissible)}
                className="absolute right-0 top-0 m-3"
              >
                {/* {isPasswdVissible ? (
                  <EyeOn width={18} height={18} />
                ) : (
                  <EyeOff width={18} height={18} />
                )} */}
              </Pressable>
            ) : null}
          </View>
        )}
      />
    </View>
  );
};

export default UserInput;
