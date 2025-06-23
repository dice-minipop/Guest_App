import { useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, Text } from 'react-native';

interface LikeSwitchComponentProps {
  currentType: 'SPACE' | 'ANNOUNCEMENT';
  handleType: () => void;
}

const LikeSwitchComponent: React.FC<LikeSwitchComponentProps> = ({ currentType, handleType }) => {
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
      toValue: currentType === 'ANNOUNCEMENT' ? 0 : 69,
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
        currentType === 'SPACE' ? 'text-black' : 'text-white'
      }`}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
        }}
        className="absolute left-[4px] top-[3px] h-full w-1/2 rounded-full bg-white"
      />
      <Text
        className={`BTN1 px-[11px] py-[10.5px] text-center ${currentType === 'SPACE' ? 'text-black' : 'text-white'}`}
      >
        찜한공간
      </Text>
      <Text
        className={`BTN1 px-[11px] py-[10.5px] text-center ${currentType === 'ANNOUNCEMENT' ? 'text-black' : 'text-white'}`}
      >
        찜한공고
      </Text>
    </Pressable>
  );
};

export default LikeSwitchComponent;
