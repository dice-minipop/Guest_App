import { Fragment, useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import BlackIndicator from '@/assets/icons/black-indicator.svg';
import GrayIndicator from '@/assets/icons/gray-indicator.svg';
import { LottieItems } from '@/constants/lottieItems';

import CarouselItemComponent from './carouselItem';

const CarouselComponent: React.FC = () => {
  const screenWidth = Dimensions.get('screen').width;

  const lottieWidth = Math.min(screenWidth, 500);
  const calculatedHeight = (screenWidth * 378) / 375;
  const lottieHeight = Math.min(calculatedHeight, 500);

  const progress = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // progress를 정수 index로 변환해서 상태로 저장
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex(Math.round(progress.value));
    }, 100);

    return () => clearInterval(id);
  }, []);

  return (
    <Fragment>
      <Carousel
        width={lottieWidth}
        // Lottie 이미지 크기 + 텍스트크기 + 간격 2개
        height={lottieHeight + 152}
        loop={true}
        data={LottieItems}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlay={true}
        autoPlayInterval={6000}
        onProgressChange={progress}
        renderItem={({ item }) => <CarouselItemComponent item={item} />}
      />

      <View className="flex flex-row justify-center gap-x-[12px] mb-[40px]">
        {LottieItems.map((_, dotIndex) => (
          <View key={dotIndex}>
            {dotIndex === currentIndex ? <BlackIndicator /> : <GrayIndicator />}
          </View>
        ))}
      </View>
    </Fragment>
  );
};

export default CarouselComponent;
