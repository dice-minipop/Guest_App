import React, { useRef, useState } from 'react';
import { Text, Animated, Pressable, Dimensions } from 'react-native';

interface SwitchComponentProps {
  type: string;
  handleType: () => void;
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({ type, handleType }) => {
  const width = Dimensions.get('screen').width;
  const translateX = useRef(new Animated.Value(0)).current;

  const [switchWidth, setSwitchWidth] = useState<number>(0);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setSwitchWidth(width);
  };

  const slideAnimation = () => {
    handleType();

    Animated.timing(translateX, {
      toValue: type === 'recruit' ? 0 : 70,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={() => slideAnimation()}
      onLayout={handleLayout}
      style={{ left: (width - switchWidth) / 2 }}
      className={`absolute flex flex-row items-center rounded-full bg-black p-1 ${
        type === 'popUp' ? 'text-black' : 'text-white'
      }`}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
        }}
        className="absolute left-1 top-1 h-full w-1/2 rounded-full bg-white"
      />
      <Text className={`${type === 'popUp' ? 'text-black' : 'text-white'} p-3 font-BTN1 text-BTN1`}>
        찜한공간
      </Text>
      <Text
        className={`${type === 'recruit' ? 'text-black' : 'text-white'} p-3 font-BTN1 text-BTN1`}
      >
        찜한공고
      </Text>
    </Pressable>
  );
};

export default SwitchComponent;
