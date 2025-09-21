import { Pressable, Text, View } from 'react-native';

import { purposeItems } from '@/constants/filtering';

interface PurposeProps {
  value: string[] | undefined;
  handleValue: (e: string) => void;
}

const Purpose: React.FC<PurposeProps> = ({ value, handleValue }) => {
  return (
    <View className="gap-y-[12px]">
      <Text className="SUB2 text-black">인기 방문 목적</Text>
      <View className="flex flex-row flex-wrap items-center gap-x-[4px]">
        {purposeItems.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => handleValue(item.value)}
            className={`flex flex-row items-center gap-x-[2px] border rounded-[4px] p-[9px] ${value?.includes(item.value) ? 'border-purple' : 'border-stroke'}`}
          >
            <Text
              className={`BTN2 ${value?.includes(item.value) ? 'text-purple' : 'text-deep_gray'}`}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Purpose;
