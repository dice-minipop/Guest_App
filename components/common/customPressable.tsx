import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import DiceIcon from '@/assets/icons/dice.svg';
import GlobeIcon from '@/assets/icons/globe.svg';
import GrayDownArrowIcon from '@/assets/icons/grayDownArrow.svg';
import GrayUpArrowIcon from '@/assets/icons/grayUpArrow.svg';

interface CustomPressableComponentProps {
  buttonText: string;
  onPress: any;
  disabled: boolean;
  color?: 'BLACK' | 'GRAY' | 'WHITE';
  icon?: 'DICE' | 'GLOBE';
  arrow?: 'DOWN' | 'UP';
}

const CustomPressableComponent: React.FC<CustomPressableComponentProps> = ({
  buttonText,
  onPress,
  disabled,
  color = 'BLACK',
  icon,
  arrow,
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const buttonColorStyles = {
    BLACK: 'bg-black ',
    GRAY: 'bg-light_gray ',
    WHITE: 'bg-white border border-stroke',
  };

  const textColorStyles = {
    BLACK: 'text-white',
    GRAY: 'text-white',
    WHITE: 'text-medium_gray',
  };

  // 패딩 설정
  const paddingYClass =
    icon === 'DICE' || arrow
      ? color === 'WHITE'
        ? 'py-[13px]'
        : 'py-[14px]'
      : color === 'WHITE'
        ? 'py-[14.5px]'
        : 'py-[15.5px]';

  const baseContainerStyle = `flex flex-row items-center rounded-lg ${paddingYClass}`;

  const baseTextStyle = `BTN1 text-center`;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={`${isPressed && 'opacity-50'} mx-[20px]`}
    >
      <View className={`${baseContainerStyle} ${buttonColorStyles[color]}`}>
        <View className="w-[24px] h-[24px] mr-[16px]" />

        <View className="flex-1 flex flex-row justify-center items-center gap-x-[8px]">
          {icon === 'DICE' && <DiceIcon />}
          {icon === 'GLOBE' && <GlobeIcon />}
          <Text className={`${baseTextStyle} ${textColorStyles[color]}`}>{buttonText}</Text>
        </View>

        {arrow ? (
          arrow === 'DOWN' ? (
            <View className="mr-[16px]">
              <GrayDownArrowIcon />
            </View>
          ) : (
            <View className="mr-[16px]">
              <GrayUpArrowIcon />
            </View>
          )
        ) : (
          // placeholder
          <View className="w-[24px] h-[24px] mr-[16px]" />
        )}
      </View>
    </Pressable>
  );
};

export default CustomPressableComponent;
