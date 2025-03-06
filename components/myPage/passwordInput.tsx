import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface PasswordInputComponentProps {
  type?: string;
  title: string;
  value: string;
  handleValue: (text: string) => void;
  placeholder: string;
  warningMessage?: string;
  successMessage?: string;
  compareValue?: string;
}

const PasswordInputComponent: React.FC<PasswordInputComponentProps> = ({
  type,
  title,
  value,
  handleValue,
  placeholder,
  warningMessage,
  successMessage,
  compareValue,
}) => {
  const [isFocued, setIsFocused] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [canUse, setCanUse] = useState<boolean>(false);

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  useEffect(() => {
    if (isValidPassword(value)) {
      setCanUse(true);
    } else {
      setCanUse(false);
    }
  }, [value]);

  return (
    <View className="flex flex-col gap-y-2 px-5">
      <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">{title}</Text>
      <TextInput
        secureTextEntry={!isVisible}
        value={value}
        onChangeText={handleValue}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`p-4 border rounded-lg text-BODY2 font-BODY2 text-dark_gray ${isFocued ? 'border-black' : 'border-light_gray'}`}
      />
      {successMessage !== undefined && warningMessage !== undefined && value !== '' && (
        <Text
          className={`text-CAP2 font-CAP2 leading-CAP2 ${canUse ? 'text-green' : 'text-yellow'}`}
        >
          {canUse ? successMessage : warningMessage}
        </Text>
      )}

      {type === 'check' && successMessage !== undefined && value !== '' && (
        <Text
          className={`text-CAP2 font-CAP2 leading-CAP2 ${canUse ? 'text-green' : 'text-yellow'}`}
        >
          {value === compareValue && successMessage}
        </Text>
      )}
    </View>
  );
};

export default PasswordInputComponent;
