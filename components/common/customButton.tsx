import React, { useState } from 'react';
import { Text, Pressable } from 'react-native';

interface CustomButtonProps {
  type: 'normal';
  onPress: any;
  disabled: boolean;
  color: string;
  text: string;
  textColor: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  onPress,
  disabled,
  color,
  text,
  textColor,
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const styles = {
    normal: `w-full mx-auto flex justify-center items-center rounded-lg`,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={`py-4 ${isPressed && 'opacity-50'} bg-${color} ${styles[type]}`}
    >
      <Text className={`text-${textColor} text-center font-BTN1 text-BTN1`}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;
