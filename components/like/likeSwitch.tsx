import { useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, Text } from 'react-native';

interface LikeSwitchComponentProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function LikeSwitchComponent({ index, setIndex }: LikeSwitchComponentProps) {
  const width = Dimensions.get('screen').width;
  const translateX = useRef(new Animated.Value(0)).current;

  const [switchWidth, setSwitchWidth] = useState<number>(0);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setSwitchWidth(width);
  };

  const slideAnimation = () => {
    const newIndex = index === 0 ? 1 : 0; // 새 index 계산
    setIndex(newIndex);

    Animated.timing(translateX, {
      toValue: newIndex === 0 ? 0 : 69, // 새 index 기준
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={() => slideAnimation()}
      onLayout={handleLayout}
      style={{ left: (width - switchWidth) / 2 }}
      className={`absolute top-[-24px] flex flex-row items-center rounded-full bg-black p-[3px] ${
        index === 0 ? 'text-black' : 'text-white'
      }`}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
        }}
        className="absolute left-[4px] top-[3px] h-full w-1/2 rounded-full bg-white"
      />
      <Text
        className={`BTN1 px-[11px] py-[10.5px] text-center ${index === 0 ? 'text-black' : 'text-white'}`}
      >
        찜한공간
      </Text>
      <Text
        className={`BTN1 px-[11px] py-[10.5px] text-center ${index === 1 ? 'text-black' : 'text-white'}`}
      >
        찜한공고
      </Text>
    </Pressable>
  );
}
