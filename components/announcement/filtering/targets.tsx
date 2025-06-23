import { Pressable, Text, View } from 'react-native';

interface TargetsFilteringComponentProps {
  items: {
    title: string;
    value: string;
  }[];
  value: string[] | undefined;
  handleValue: (item: string) => void;
}

const TargetsFilteringComponent: React.FC<TargetsFilteringComponentProps> = ({
  items,
  value,
  handleValue,
}) => {
  return (
    <View className="px-[20px] gap-y-[24px]">
      <Text className="CAP1 text-dark_gray">지원대상</Text>
      <View className="gap-y-[4px]">
        {items.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => handleValue(item.value)}
            className={`p-[16px] rounded-lg ${value?.includes(item.value) ? 'bg-back_gray' : 'bg-white'}`}
          >
            <Text
              className={`SUB2 ${value?.includes(item.value) ? 'text-black' : 'text-medium_gray'}`}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default TargetsFilteringComponent;
