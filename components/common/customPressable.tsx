import React, { useState, ReactNode } from 'react';
import { Pressable } from 'react-native';

interface CustomPressableProps {
  children: ReactNode;
  onPress: any;
  disabled: boolean;
}

const CustomPressable: React.FC<CustomPressableProps> = ({ children, onPress, disabled }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={`${isPressed && 'opacity-50'} flex-1`}
    >
      {children}
    </Pressable>
  );
};

export default CustomPressable;
