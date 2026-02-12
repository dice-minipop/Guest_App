import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';

import { targetsItems } from '@/constants/filtering';
import { useAnnouncementFilterStore } from '@/zustands/filter/announcement';

interface TargetsFilteringProps {
  viewRef: React.RefObject<View | null>;
  handleLayout: (event: LayoutChangeEvent, index: number) => void;
}

export default function TargetsFiltering({ viewRef, handleLayout }: TargetsFilteringProps) {
  const { announcementFilter, setAnnouncementFilter } = useAnnouncementFilterStore();

  const toggleValue = <T, K extends keyof typeof announcementFilter>(key: K, value: T) => {
    const current = announcementFilter[key] as T[] | undefined;
    const next = current?.includes(value)
      ? current.filter((v) => v !== value)
      : [...(current ?? []), value];

    setAnnouncementFilter({ [key]: next } as Partial<typeof announcementFilter>);
  };

  return (
    <View
      className="gap-y-[24px] mt-[24px]"
      ref={viewRef}
      onLayout={(event) => handleLayout(event, 1)}
    >
      <View className="h-[8px] bg-back_gray" />

      <View className="px-[20px] gap-y-[24px]">
        <Text className="CAP1 text-dark_gray">지원대상</Text>
        <View className="gap-y-[4px]">
          {targetsItems.map((item) => (
            <Pressable
              key={item.title}
              onPress={() => toggleValue('targets', item.value)}
              className={`p-[16px] rounded-lg ${announcementFilter.targets?.includes(item.value) ? 'bg-back_gray' : 'bg-white'}`}
            >
              <Text
                className={`SUB2 ${announcementFilter.targets?.includes(item.value) ? 'text-black' : 'text-medium_gray'}`}
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
