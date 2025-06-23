import { Slider } from '@miblanchard/react-native-slider';
import { Text, View } from 'react-native';

import ThumbIcon from '@/assets/icons/filtering/thumb.svg';

interface PriceFilteringComponentProps {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  handlePriceRange: (range: [number, number]) => void;
}

const PriceFilteringComponent: React.FC<PriceFilteringComponentProps> = ({
  minPrice,
  maxPrice,
  handlePriceRange,
}) => {
  const priceText = (price: number) => (price === 0 ? 0 : price / 10000);

  return (
    <View className="px-[20px] gap-y-[24px]">
      <Text className="CAP1 text-dark_gray">가격</Text>

      <View className="flex flex-row items-center gap-x-[8px] mb-[8px]">
        <View className="bg-back_gray border border-stroke px-[12px] py-[5.5px] rounded-full">
          <Text className="BTN1 text-deep_gray">1일 대여</Text>
        </View>

        <Text className="SUB1 text-black">
          <Text className="text-purple">{priceText(minPrice ?? 0)} </Text>원 ~{' '}
          <Text className="text-purple">{priceText(maxPrice ?? 300000)} </Text>만원
        </Text>
      </View>

      <View>
        <Slider
          value={[minPrice ?? 0, maxPrice ?? 300000]}
          onValueChange={(values) => {
            const [min, max] = values as [number, number];
            handlePriceRange([min, max]);
          }}
          minimumValue={0}
          maximumValue={300000}
          step={10000}
          renderThumbComponent={() => <ThumbIcon />}
        />

        <View className="flex-row justify-between mb-[8px]">
          <Text className="CAP1 text-light_gray">0원</Text>
          <Text className="CAP1 text-light_gray ml-[18px]">15만원</Text>
          <Text className="CAP1 text-light_gray">30만원</Text>
        </View>
      </View>
    </View>
  );
};

export default PriceFilteringComponent;
