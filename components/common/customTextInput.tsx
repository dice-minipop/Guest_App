import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface CustomTextInputProps {
  label?: string;
  subLabel?: string;
  required?: boolean;
  placeholder: string;
  multiline?: boolean;
  height?: string;
  value: string;
  setValue: (value: string) => void;
  isPassword?: boolean;
}

export default function CustomTextInput({
  label,
  subLabel,
  required = false,
  placeholder,
  multiline = false,
  height,
  value,
  setValue,
  isPassword = false,
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View className="gap-y-[8px]">
      {label && (
        <Text className="CAP1 text-dark_gray">
          {label}
          <Text className="text-semiLight_gray">{subLabel}</Text>
          {required && <Text className="text-red">*</Text>}
        </Text>
      )}

      <TextInput
        value={value}
        onChangeText={setValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor="#CCCCCC"
        autoCapitalize="none"
        secureTextEntry={isPassword}
        className={`p-4 border ${isFocused ? 'border-black' : 'border-light_gray'} rounded-lg ${height ?? ''}`}
      />
    </View>
  );
}
