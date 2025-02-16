import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { useSpaceFilteringStore } from '@/zustands/filter/store';

const SortFilterComponent: React.FC = () => {
  const { filtering, setFiltering, deleteFiltering } = useSpaceFilteringStore();

  const handleSortType = (newStatus: string) => {
    if (newStatus === filtering.sortBy) {
      deleteFiltering('sortBy');
    } else {
      setFiltering('sortBy', newStatus);
    }
  };

  return (
    <View className="gap-y-6">
      <Text className="font-CAP1 text-CAP1 text-dark_gray">정렬</Text>
      <View className="gap-y-1">
        {['인기 순', '가까운 순', '낮은 가격 순', '높은 가격 순'].map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleSortType(item)}
            className={`rounded-lg p-4 ${filtering.sortBy === item ? 'bg-back_gray' : 'bg-white'}`}
          >
            <Text
              className={`font-SUB2 text-SUB2 ${
                filtering.sortBy === item ? 'text-black' : 'text-medium_gray'
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

export default SortFilterComponent;
