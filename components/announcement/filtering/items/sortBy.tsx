import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';

import { announcementSoryByItems } from '@/constants/filtering';
import { useAnnouncementFilterStore } from '@/zustands/filter/announcement';

interface SortByFilteringProps {
  viewRef: React.RefObject<View>;
  handleLayout: (event: LayoutChangeEvent, index: number) => void;
}

const SortByFiltering: React.FC<SortByFilteringProps> = ({ viewRef, handleLayout }) => {
  const { announcementFilter, setAnnouncementFilter } = useAnnouncementFilterStore();

  return (
    <View
      className="gap-y-[24px] mt-[24px]"
      ref={viewRef}
      onLayout={(event) => handleLayout(event, 3)}
    >
      <View className="h-[8px] bg-back_gray" />

      <View className="px-[20px] gap-y-[24px]">
        <Text className="CAP1 text-dark_gray">정렬</Text>
        <View className="gap-y-[4px]">
          {announcementSoryByItems.map((item) => (
            <Pressable
              key={item.title}
              onPress={() =>
                setAnnouncementFilter({
                  sortBy: announcementFilter.sortBy === item.value ? undefined : item.value,
                })
              }
              className={`p-[16px] rounded-lg ${announcementFilter.sortBy === item.value ? 'bg-back_gray' : 'bg-white'}`}
            >
              <Text
                className={`SUB2 ${announcementFilter.sortBy === item.value ? 'text-black' : 'text-medium_gray'}`}
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
