import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';

import { spaceSortByItems } from '@/constants/filtering';
import { useSpaceFilterStore } from '@/zustands/filter/space';

interface SortByFilteringProps {
  viewRef: React.RefObject<View>;
  handleLayout: (event: LayoutChangeEvent, index: number) => void;
}

const SortByFiltering: React.FC<SortByFilteringProps> = ({ viewRef, handleLayout }) => {
  const { spaceFilter, setSpaceFilter } = useSpaceFilterStore();

  return (
    <View
      className="gap-y-[24px] mt-[24px]"
      ref={viewRef}
      onLayout={(event) => handleLayout(event, 4)}
    >
      <View className="h-[8px] bg-back_gray" />

      <View className="px-[20px] gap-y-[24px]">
        <Text className="CAP1 text-dark_gray">정렬</Text>
        <View className="gap-y-[4px]">
          {spaceSortByItems.map((item) => (
            <Pressable
              key={item.title}
              onPress={() =>
                setSpaceFilter({
                  sortBy: spaceFilter.sortBy === item.value ? undefined : item.value,
                })
              }
              className={`p-[16px] rounded-lg ${spaceFilter.sortBy === item.value ? 'bg-back_gray' : 'bg-white'}`}
            >
              <Text
                className={`SUB2 ${spaceFilter.sortBy === item.value ? 'text-black' : 'text-medium_gray'}`}
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

export default SortByFiltering;
