import { Slider } from '@miblanchard/react-native-slider';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';

import { priceItems } from '@/constants/filtering';
import { useSpaceFilterStore } from '@/zustands/filter/space';

interface PriceFilteringComponentProps {
  viewRef: React.RefObject<View | null>;
  handleLayout: (event: LayoutChangeEvent, index: number) => void;
}

const PriceFilteringComponent: React.FC<PriceFilteringComponentProps> = ({
  viewRef,
  handleLayout,
}) => {
  const { spaceFilter, setSpaceFilter } = useSpaceFilterStore();

  const trackMarks = [0, 500000, 1000000];

  const priceText = (price: number) => (price === 0 ? 0 : price / 10000);

  return (
    <View
      className="gap-y-[24px] mt-[24px]"
      ref={viewRef}
      onLayout={(event) => handleLayout(event, 1)} // 유동인구 제거로 인덱스 변경: 2 → 1
    >
      <View className="h-[8px] bg-back_gray" />

      <View className="gap-y-[24px] px-[20px]">
        <Text className="CAP1 text-dark_gray">가격</Text>

        <View className="flex flex-row items-center gap-x-[8px] mb-[8px]">
          <View className="bg-back_gray border border-stroke px-[12px] py-[5.5px] rounded-full">
            <Text className="BTN1 text-deep_gray">1일 대여</Text>
          </View>

          {spaceFilter.minPrice === 0 && (
            <Text className="SUB1 text-black">
              <Text className="text-purple">{priceText(spaceFilter.minPrice ?? 0)} </Text>원 ~{' '}
              <Text className="text-purple">{priceText(spaceFilter.maxPrice ?? 1000000)} </Text>만원
            </Text>
          )}
          {spaceFilter.minPrice !== 0 && spaceFilter.minPrice !== 1000000 && (
            <Text className="SUB1 text-black">
              <Text className="text-purple">{priceText(spaceFilter.minPrice ?? 0)} </Text>만원 ~{' '}
              <Text className="text-purple">{priceText(spaceFilter.maxPrice ?? 1000000)} </Text>만원
            </Text>
          )}
          {spaceFilter.minPrice === 1000000 && spaceFilter.maxPrice === 1000000 && (
            <Text className="SUB1 text-black">
              <Text className="text-purple">{priceText(spaceFilter.minPrice ?? 1000000)} </Text>만원
              이상
            </Text>
          )}
        </View>

        <Slider
          value={[spaceFilter.minPrice ?? 0, spaceFilter.maxPrice ?? 1000000]}
          onValueChange={(values) => {
            const [min, max] = values as [number, number];
            setSpaceFilter({ minPrice: min });
            setSpaceFilter({ maxPrice: max });
          }}
          minimumValue={0}
          maximumValue={1000000}
          step={10000}
          trackMarks={trackMarks}
          renderTrackMarkComponent={(index) => {
            const isFirst = index === 0;
            const isLast = index === 2;
            return (
              <Text
                className={`CAP1 text-light_gray mt-[48px] ${isLast ? 'translate-x-[-42px]' : isFirst ? 'translate-x-[-4px]' : 'translate-x-[-8px]'}`}
              >
                {priceText(trackMarks[index])}
                {isFirst ? '' : '만'}원{isLast ? ' 이상' : ''}
              </Text>
            );
          }}
          // renderThumbComponent={() => <ThumbIcon />}
        />

        <View className="flex flex-row flex-wrap items-center gap-x-[4px] gap-y-[8px]">
          {priceItems.map((item) => (
            <Pressable
              key={item.title}
              onPress={() => {
                setSpaceFilter({ minPrice: item.min });
                setSpaceFilter({ maxPrice: item.max });
              }}
              className={`flex flex-row items-center gap-x-[2px] border rounded-[4px] p-[9px] ${spaceFilter.minPrice === item.min && spaceFilter.maxPrice === item.max ? 'border-purple' : 'border-stroke'}`}
            >
              <Text
                className={`BTN2 ${spaceFilter.minPrice === item.min && spaceFilter.maxPrice === item.max ? 'text-purple' : 'text-deep_gray'}`}
              >
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default PriceFilteringComponent;
