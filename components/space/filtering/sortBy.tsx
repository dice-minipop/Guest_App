import { Pressable, Text, View } from 'react-native';

interface SortByFilteringComponentProps {
  items: {
    title: string;
    value: string;
  }[];
  value: string | undefined;
  handleValue: (item: string) => void;
}

export default function SortByFilteringComponent({
  items,
  value,
  handleValue,
}: SortByFilteringComponentProps) {
  return (
    <View className="px-[20px] gap-y-[24px]">
      <Text className="CAP1 text-dark_gray">정렬</Text>
      <View className="gap-y-[4px]">
        {items.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => handleValue(item.value)}
            className={`p-[16px] rounded-lg ${value === item.value ? 'bg-back_gray' : 'bg-white'}`}
          >
            <Text className={`SUB2 ${value === item.value ? 'text-black' : 'text-medium_gray'}`}>
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
