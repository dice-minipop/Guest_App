import { Image } from 'expo-image';
import { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { SpaceDetailComponentProps } from '@/types/space';

const SpaceImageListComponent: React.FC<SpaceDetailComponentProps> = ({ data }) => {
  const width = Dimensions.get('screen').width;

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <View className="relative">
      <Carousel
        width={width}
        height={width}
        loop={true}
        data={data.imageUrls}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlay={false}
        onSnapToItem={setCurrentIndex}
        renderItem={({ item }) => <Image source={item} style={{ width: width, height: width }} />}
      />

      <View className="absolute bottom-[20px] right-[20px] bg-black/50 rounded-full px-[9px] py-[1.5px]">
        <Text className="BTN1 text-white">
          {currentIndex + 1} / {data.imageUrls.length}
        </Text>
      </View>
    </View>
  );
};

export default SpaceImageListComponent;
