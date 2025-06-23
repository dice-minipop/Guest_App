import React, { Fragment, useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import DownArrowIcon from '@/assets/icons/downArrow.svg';
import EyeOffIcon from '@/assets/icons/eye-off.svg';
import EyeOnIcon from '@/assets/icons/eye-on.svg';
import RoundXIcon from '@/assets/icons/roundX.svg';
import { domainItems } from '@/constants/domainItem';
import {
  validateEmail,
  validatePassword,
  validatePasswordCheck,
  validatePhone,
} from '@/utils/validation';
import { useDomainModalStore } from '@/zustands/onBoard/store';

interface InputControllerComponentProps {
  control: any;
  title: string;
  name: string;
  placeholder: string;
  shouldValidate?: boolean;
}

const InputControllerComponent: React.FC<InputControllerComponentProps> = ({
  control,
  title,
  name,
  placeholder,
  shouldValidate = true,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');
  const [messageColor, setMessageColor] = useState<'text-yellow' | 'text-green' | 'text-red'>(
    'text-yellow',
  );

  const [localEmail, setLocalEmail] = useState<string>('');
  const [domainEmail, setDomainEmail] = useState<string>('');

  const { isDomainModalOpen, setIsDomainModalOpen } = useDomainModalStore();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const value = useWatch({
    control,
    name,
  });

  const password = useWatch({ control, name: 'password' });
  const newPassword = useWatch({ control, name: 'newPassword' });

  useEffect(() => {
    if (!shouldValidate) return;

    if (name === 'email') {
      const check = async () => {
        await validateEmail(value, domainEmail, setMessage, setMessageColor);
      };
      check();
    } else if (name === 'password' || name === 'newPassword') {
      validatePassword(value ?? '', setMessage, setMessageColor);
    } else if (name === 'passwordCheck') {
      validatePasswordCheck(password ?? '', value ?? '', setMessage, setMessageColor);
    } else if (name === 'newPasswordCheck') {
      validatePasswordCheck(newPassword ?? '', value ?? '', setMessage, setMessageColor);
    } else if (name === 'phone' && value !== undefined && value !== '') {
      const check = async () => {
        await validatePhone(value, setMessage, setMessageColor);
      };
      check();
    }
  }, [value, password, newPassword, name, domainEmail, shouldValidate]);

  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text className="CAP1 text-dark_gray mb-[8px] ml-[4px]">
              {title}
              <Text className="text-red">*</Text>
            </Text>

            <View
              className={`relative flex flex-row items-center border rounded-lg bg-white pl-[16px] ${messageColor === 'text-red' ? 'border-red' : isFocused ? 'border-black' : 'border-light_gray'}`}
            >
              {name === 'email' ? (
                <View className="flex flex-row items-center gap-x-[8px]">
                  <TextInput
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      setIsFocused(false);
                      onBlur();
                    }}
                    onChangeText={(e: string) => {
                      setLocalEmail(e);
                      setDomainEmail('');
                    }}
                    value={localEmail}
                    placeholder={placeholder}
                    placeholderTextColor="#CCCCCC"
                    autoCapitalize="none"
                    className="flex-1 h-[44px]"
                  />
                  <Text className="BODY2 text-dark_gray">@</Text>
                  <Pressable
                    onPress={() => {
                      Keyboard.dismiss();
                      setIsDomainModalOpen(!isDomainModalOpen);
                    }}
                    disabled={localEmail === ''}
                    className="flex-1 flex flex-row justify-between items-center relative"
                  >
                    <Text
                      className={`BODY2 ${domainEmail !== '' ? 'text-dark_gray' : 'text-light_gray'}`}
                    >
                      {domainEmail !== '' ? domainEmail : '선택하기'}
                    </Text>
                    <View className="p-[10px]">
                      <DownArrowIcon />
                    </View>
                  </Pressable>
                </View>
              ) : (
                <TextInput
                  placeholder={placeholder}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setIsFocused(false);
                    onBlur();
                  }}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor="#CCCCCC"
                  autoCapitalize="none"
                  secureTextEntry={
                    name === 'password' ||
                    name === 'passwordCheck' ||
                    name === 'currentPassword' ||
                    name === 'newPassword' ||
                    name === 'newPasswordCheck'
                      ? !isVisible
                      : false
                  }
                  keyboardType={name === 'phone' ? 'phone-pad' : 'default'}
                  className="flex-1 h-[44px]"
                />
              )}

              {value !== '' && value !== undefined && (
                <View className="flex flex-row items-center">
                  <Pressable onPress={() => onChange('')} className="p-[13px]">
                    <RoundXIcon />
                  </Pressable>

                  {(name === 'password' ||
                    name === 'passwordCheck' ||
                    name === 'currentPassword' ||
                    name === 'newPassword' ||
                    name === 'newPasswordCheck') && (
                    <Pressable onPress={() => setIsVisible(!isVisible)} className="p-[13px]">
                      {isVisible ? <EyeOnIcon /> : <EyeOffIcon />}
                    </Pressable>
                  )}
                </View>
              )}
            </View>

            {message !== '' && (
              <Text className={`CAP2 mt-[4px] ml-[4px] ${messageColor}`}>{message}</Text>
            )}

            {name === 'email' && isDomainModalOpen && (
              <View
                className={`z-50 absolute top-full right-0 bg-white rounded-xl border border-light_gray p-[4px] mt-[4px] ${message !== '' && '-mt-[18px]'}`}
              >
                {domainItems.map((domain) => (
                  <Pressable
                    key={domain}
                    onPress={() => {
                      setDomainEmail(domain);
                      onChange(`${localEmail}@${domain}`);
                      setIsDomainModalOpen(false);
                    }}
                    className="py-[11.5px] pl-[8px] w-[144px]"
                  >
                    <Text className="BTN1 text-medium_gray">{domain}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        )}
        name={name}
      />
    </>
  );
};

export default InputControllerComponent;
