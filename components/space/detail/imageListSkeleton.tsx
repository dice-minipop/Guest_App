import { useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export default function SpaceImageListSkeleton() {
  const width = Dimensions.get('screen').width;

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <View className="relative">
      <Carousel
        width={width}
        height={width}
        loop={true}
        data={Array.from({ length: 3 }, (_, i) => i + 1)}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlay={false}
        onSnapToItem={setCurrentIndex}
        renderItem={({ item }) => (
          <ContentLoader
            speed={2}
            width={width}
            height={width}
            backgroundColor="#ecebeb"
            foregroundColor="#f3f3f3"
          >
            <Rect x="0" y="0" rx="4" ry="4" width={width} height={width} />
          </ContentLoader>
        )}
      />

      <View className="absolute bottom-[20px] right-[20px] bg-black/50 rounded-full px-[9px] py-[1.5px]">
        <Text className="BTN1 text-white">
          {currentIndex + 1} / {3}
        </Text>
      </View>
    </View>
  );
}
