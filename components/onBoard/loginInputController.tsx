import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Pressable, TextInput, View } from 'react-native';

import EyeOffIcon from '@/assets/icons/eye-off.svg';
import EyeOnIcon from '@/assets/icons/eye-on.svg';
import RoundXIcon from '@/assets/icons/roundX.svg';

interface LoginInputControllerComponentProps {
  control: any;
  name: string;
  placeholder: string;
}

const LoginInputControllerComponent: React.FC<LoginInputControllerComponentProps> = ({
  control,
  name,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View
          className={`relative flex flex-row items-center border rounded-lg bg-white pl-[16px] ${isFocused ? 'border-black' : 'border-light_gray'}`}
        >
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
            secureTextEntry={name === 'password' || name === 'passwordCheck' ? !isVisible : false}
            keyboardType={name === 'phone' ? 'phone-pad' : 'default'}
            className="flex-1 h-[44px]"
          />

          {value !== '' && value !== undefined && (
            <View className="flex flex-row items-center">
              <Pressable onPress={() => onChange('')} className="p-[13px]">
                <RoundXIcon />
              </Pressable>

              {(name === 'password' || name === 'passwordCheck') && (
                <Pressable onPress={() => setIsVisible(!isVisible)} className="p-[13px]">
                  {isVisible ? <EyeOnIcon /> : <EyeOffIcon />}
                </Pressable>
              )}
            </View>
          )}
        </View>
      )}
      name={name}
    />
  );
};

export default LoginInputControllerComponent;
