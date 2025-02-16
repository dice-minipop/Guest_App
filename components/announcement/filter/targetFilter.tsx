import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { useAnnouncementFilteringStore } from '@/zustands/filter/store';

const TargetFilterComponent: React.FC = () => {
  const { filtering, setFiltering, deleteFiltering } = useAnnouncementFilteringStore();

  const handleSortType = (newTarget: string) => {
    const currentTargets = filtering.targets || [];

    if (currentTargets.includes(newTarget)) {
      // 3. 이미 존재하면 제거
      const updatedTargets = currentTargets.filter((t) => t !== newTarget);

      // 4. 제거 후 빈 배열이면 키 삭제
      if (updatedTargets.length === 0) {
        deleteFiltering('targets');
      } else {
        setFiltering('targets', updatedTargets);
      }
    } else {
      // 1, 2. 존재하지 않으면 추가
      setFiltering('targets', [...currentTargets, newTarget]);
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
            className={`rounded-lg p-4 ${filtering.targets?.includes(item) ? 'bg-back_gray' : 'bg-white'}`}
          >
            <Text
              className={`font-SUB2 text-SUB2 ${
                filtering.targets?.includes(item) ? 'text-black' : 'text-medium_gray'
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
