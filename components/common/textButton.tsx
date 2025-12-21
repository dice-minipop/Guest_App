import { ReactNode, useState } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

interface TextButtonProps extends PressableProps {
  children: ReactNode;
  onPress: () => void;
}

export default function TextButton({ children, onPress, ...rest }: TextButtonProps) {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={`self-center px-[16px] py-[13.5px] ${isPressed && 'opacity-60'}`}
      {...rest}
    >
      <Text className="BTN1 text-medium_gray text-center underline">{children}</Text>
    </Pressable>
  );
}
