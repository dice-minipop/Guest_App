import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useAnnouncementFilteringStore } from '@/zustands/filter/store';

const TargetFilterComponent: React.FC = () => {
  const { filtering, setFiltering } = useAnnouncementFilteringStore();

  const handleSortType = (target: string) => {
    if (filtering.targets.includes(target)) {
      setFiltering({ targets: filtering.targets.filter((t) => t !== target) });
    } else {
      setFiltering({ targets: [...filtering.targets, target] });
    }
  };

  return (
    <View className="gap-y-6">
      <Text className="font-CAP1 text-CAP1 text-dark_gray">지원대상</Text>
      <View className="gap-y-1">
        {['전체', '자영업자', '소상공인'].map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleSortType(item)}
            className={`rounded-lg p-4 ${filtering.targets.includes(item) ? 'bg-back_gray' : 'bg-white'}`}
          >
            <Text
              className={`font-SUB2 text-SUB2 ${
                filtering.targets.includes(item) ? 'text-black' : 'text-medium_gray'
              }`}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default TargetFilterComponent;
