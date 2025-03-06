import React, { useState } from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';

import { useCheckEmail } from '@/hooks/auth/auth';

import Icon from '../icon/icon';

const items = [
  'naver.com',
  'gmail.com',
  'yahoo.co.kr',
  'kakao.com',
  'daum.net',
  // 'hotmail.com',
  // 'hanmail.com',
  // '직접 입력',
];

interface UserInputProps<T extends FieldValues> extends TextInputProps {
  type: 'password' | 'password_check' | 'name' | 'email' | 'phone' | 'auth';
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
}

const EmailInputComponent = <T extends FieldValues>({
  type,
  name,
  control,
  rules,
}: UserInputProps<T>) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSelectDomainOpen, setIsSelectDomainOpen] = useState<boolean>(false);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [customDomain, setCustomDomain] = useState<string>('');
  const [emailId, setEmailId] = useState<string>('');

  const { mutateAsync: checkEmail } = useCheckEmail();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        ...rules,
        validate: (value) => {
          if (!value) return '이메일을 입력해주세요.';
          try {
            checkEmail({ email: value });
            return true;
          } catch {
            return '이미 가입된 이메일입니다.';
          }
        },
      }}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="relative">
          <View
            className={`flex flex-row gap-x-2 items-center border rounded-lg px-4 py-2.5 ${error ? 'border-red' : isFocused ? 'border-black' : 'border-light_gray'}`}
          >
            <TextInput
              autoCapitalize="none"
              placeholder="예: dice16"
              value={emailId}
              className="flex-1"
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                onBlur();
              }}
              onChangeText={setEmailId}
            />
            <Text className="text-BODY2 font-BODY2 text-dark_gray">@</Text>
            {selectedDomain === '직접 입력' ? (
              <View className="flex flex-row flex-1 justify-between">
                <TextInput
                  placeholder="도메인"
                  value={customDomain}
                  onChangeText={(text) => {
                    setCustomDomain(text);
                    onChange(emailId ? `${emailId}@${text}` : text);
                  }}
                />
                <Pressable onPress={() => setIsSelectDomainOpen(!isSelectDomainOpen)}>
                  <Icon.BlackDownArrow />
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  if (emailId !== '') setIsSelectDomainOpen(!isSelectDomainOpen);
                }}
                className="flex-1 flex flex-row justify-between items-center"
              >
                <Text
                  className={`text-BODY2 font-BODY2 ${selectedDomain ? 'text-dark_gray' : 'text-light_gray'}`}
                >
                  {selectedDomain || '선택하기'}
                </Text>
                <Icon.BlackDownArrow />
              </Pressable>
            )}
          </View>
          {type === 'email' && error && (
            <Text className="text-CAP2 font-CAP2 leading-CAP2 text-red mt-1 ml-2">
              {error.message}
            </Text>
          )}

          {isSelectDomainOpen && (
            <View className="absolute top-full right-0 mt-1 bg-white z-10 rounded-xl p-1 border border-light_gray">
              {items.map((item, index) => (
                <Pressable
                  key={index}
                  className="min-w-36 pl-2 py-3"
                  onPress={() => {
                    // console.log('Selected domain:', item);
                    const fullEmail = `${emailId}@${item}`;
                    setSelectedDomain(item);
                    setIsSelectDomainOpen(false);
                    onChange(fullEmail);
                  }}
                >
                  <Text className="text-BTN1 font-BTN1 text-medium_gray">{item}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      )}
    />
  );
};

export default EmailInputComponent;
