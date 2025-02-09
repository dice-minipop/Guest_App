import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useAnnouncementFilteringStore } from '@/zustands/filter/store';

const StatusFilterComponent: React.FC = () => {
  const { filtering, setFiltering } = useAnnouncementFilteringStore();

  const items = [
    { title: '모집 중', value: 'RECRUITING' },
    { title: '모잡 예정', value: '모집 예정' },
    { title: '모집 마감', value: 'CLOSED' },
  ];

  const handleSortType = (newStatus: string) => {
    if (newStatus === filtering.status) {
      setFiltering({ status: '' });
    } else {
      setFiltering({ status: newStatus });
    }
  };

  return (
    <View className="gap-y-6">
      <Text className="font-CAP1 text-CAP1 text-dark_gray">모집상태</Text>
      <View className="gap-y-1">
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleSortType(item.value)}
            className={`rounded-lg p-4 ${filtering.status === item.value ? 'bg-back_gray' : 'bg-white'}`}
          >
            <Text
              className={`font-SUB2 text-SUB2 ${
                filtering.status === item.value ? 'text-black' : 'text-medium_gray'
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

export default StatusFilterComponent;
