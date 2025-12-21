import LottieView from 'lottie-react-native';
import { Dimensions, Text, View } from 'react-native';

interface CarouselItemComponentProps {
  item: {
    title: string;
    subtitle: string;
    duration: number;
    path: string;
  };
}

const CarouselItemComponent: React.FC<CarouselItemComponentProps> = ({ item }) => {
  const screenWidth = Dimensions.get('screen').width;
  const calculatedHeight = (screenWidth * 378) / 375;

  const lottieWidth = Math.min(screenWidth, 500);
  const lottieHeight = Math.min(calculatedHeight, 500);

  return (
    // TODO: 소셜 로그인 생길 때 변경
    // <View className="flex flex-col items-center relative">
    <View className="flex flex-col items-center">
      <LottieView
        source={item.path}
        style={{
          width: lottieWidth,
          height: lottieHeight,
        }}
        autoPlay
        loop
      />
      {/* TODO: 소셜 로그인 생길 때 변경 */}
      {/* <View className="w-full gap-y-[12px] absolute -bottom-16 bg-white"> */}
      <View className="w-full gap-y-[12px] bg-white">
        <Text className="SUB1 text-center">{item.title}</Text>
        <Text className="SUB3 text-medium_gray text-center">{item.subtitle}</Text>
      </View>
    </View>
  );
};

export default CarouselItemComponent;
