import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';

import { statusItems } from '@/constants/filtering';
import { useAnnouncementFilterStore } from '@/zustands/filter/announcement';

interface StatusFilteringProps {
  viewRef: React.RefObject<View | null>;
  handleLayout: (event: LayoutChangeEvent, index: number) => void;
}

export default function StatusFiltering({ viewRef, handleLayout }: StatusFilteringProps) {
  const { announcementFilter, setAnnouncementFilter } = useAnnouncementFilterStore();

  return (
    <View
      className="gap-y-[24px] mt-[24px]"
      ref={viewRef}
      onLayout={(event) => handleLayout(event, 2)}
    >
      <View className="h-[8px] bg-back_gray" />
      <View className="px-[20px] gap-y-[24px]">
        <Text className="CAP1 text-dark_gray">모집상태</Text>
        <View className="gap-y-[4px]">
          {statusItems.map((item) => (
            <Pressable
              key={item.title}
              onPress={() =>
                setAnnouncementFilter({
                  sortBy: announcementFilter.status === item.value ? undefined : item.value,
                })
              }
              className={`p-[16px] rounded-lg ${announcementFilter.status === item.value ? 'bg-back_gray' : 'bg-white'}`}
            >
              <Text
                className={`SUB2 ${announcementFilter.status === item.value ? 'text-black' : 'text-medium_gray'}`}
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
