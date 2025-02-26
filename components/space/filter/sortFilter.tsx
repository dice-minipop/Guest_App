import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { useSpaceFilteringStore } from '@/zustands/filter/store';

const SortFilterComponent: React.FC = () => {
  const { filtering, setFiltering, deleteFiltering } = useSpaceFilteringStore();

  const items = [
    { title: '인기 순', value: 'likeCount' },
    { title: '최신 순', value: 'latest' },
    { title: '낮은 가격 순', value: 'priceAsc' },
    { title: '높은 가격 순', value: 'priceDesc' },
  ];

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
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleSortType(item.value)}
            className={`rounded-lg p-4 ${filtering.sortBy === item.value ? 'bg-back_gray' : 'bg-white'}`}
          >
            <Text
              className={`font-SUB2 text-SUB2 ${
                filtering.sortBy === item.value ? 'text-black' : 'text-medium_gray'
              }`}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default SortFilterComponent;
