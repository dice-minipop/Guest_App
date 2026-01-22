import { Slider } from '@miblanchard/react-native-slider';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';

import { sizeItems } from '@/constants/filtering';
import { useSpaceFilterStore } from '@/zustands/filter/space';

interface SizeFilteringProps {
  viewRef: React.RefObject<View | null>;
  handleLayout: (event: LayoutChangeEvent, index: number) => void;
}

export default function SizeFiltering({ viewRef, handleLayout }: SizeFilteringProps) {
  const { spaceFilter, setSpaceFilter } = useSpaceFilterStore();

  const trackMarks = [0, 75, 150];

  return (
    <View
      className="gap-y-[24px] mt-[24px]"
      ref={viewRef}
      onLayout={(event) => handleLayout(event, 2)} // 유동인구 제거로 인덱스 변경: 3 → 2
    >
      <View className="h-[8px] bg-back_gray" />

      <View className="gap-y-[24px] px-[20px]">
        <Text className="CAP1 text-dark_gray">공간크기</Text>

        {spaceFilter.minSize === 150 && spaceFilter.maxSize === 150 ? (
          <Text className="SUB1 text-black">
            <Text className="text-purple">{spaceFilter.minSize ?? 150}</Text>평 이상
            <Text className="text-semiLight_gray"> ≒ </Text>
            <Text className="text-purple">{spaceFilter.minSize ?? 150 * 3.3058}</Text>m² 이상
          </Text>
        ) : (
          <Text className="SUB1 text-black">
            <Text className="text-purple">{spaceFilter.minSize ?? 0}</Text>평~
            <Text className="text-purple">{spaceFilter.maxSize ?? 150}</Text>평
            <Text className="text-semiLight_gray"> ≒ </Text>
            <Text className="text-purple">
              {spaceFilter.minSize ? spaceFilter.minSize * 3.3058 : 0 * 3.3058}
            </Text>
            m²~
            <Text className="text-purple">
              {spaceFilter.maxSize ? spaceFilter.maxSize * 3.3058 : 150 * 3.3058}
            </Text>
            m²
          </Text>
        )}

        <Slider
          value={[spaceFilter.minSize ?? 0, spaceFilter.maxSize ?? 150]}
          onValueChange={(values) => {
            const [min, max] = values as [number, number];
            setSpaceFilter({ minSize: min });
            setSpaceFilter({ maxSize: max });
          }}
          minimumValue={0}
          maximumValue={150}
          step={5}
          trackMarks={trackMarks}
          renderTrackMarkComponent={(index) => {
            const isLast = index === 2;
            return (
              <Text
                className={`CAP1 text-light_gray mt-[48px] ${isLast ? 'translate-x-[-34px]' : 'translate-x-[-2px]'}`}
              >
                {trackMarks[index]}평{isLast ? ' 이상' : ''}
              </Text>
            );
          }}

          // renderThumbComponent={() => (
          //   <View className="p-[12px]">
          //     <ThumbIcon />
          //   </View>
          // )}
        />

        <View className="flex flex-row flex-wrap items-center gap-x-[4px] gap-y-[8px]">
          {sizeItems.map((item) => (
            <Pressable
              key={item.title}
              onPress={() => {
                setSpaceFilter({ minSize: item.min });
                setSpaceFilter({ maxSize: item.max });
              }}
              className={`flex flex-row items-center gap-x-[2px] border rounded-[4px] p-[9px] ${spaceFilter.minSize === item.min && spaceFilter.maxSize === item.max ? 'border-purple' : 'border-stroke'}`}
            >
              <Text
                className={`BTN2 ${spaceFilter.minSize === item.min && spaceFilter.maxSize === item.max ? 'text-purple' : 'text-deep_gray'}`}
              >
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
