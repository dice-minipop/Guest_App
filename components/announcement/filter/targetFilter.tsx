import React from 'react';
import { Text, View, Pressable } from 'react-native';

import Icon from '@/components/icon/icon';
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
        {['자영업자', '소상공인'].map((item, index) => (
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

      <View className="border border-stroke p-4 rounded-xl flex flex-row gap-x-1">
        <Icon.Information />
        <View className="flex flex-col gap-y-2">
          <Text className="text-CAP1 font-CAP1 leading-CAP1 text-semiLight_gray">
            자영업자와 소상공인은 이렇게 달라요
          </Text>
          <View>
            <Text className="text-CAP1 font-CAP1 leading-CAP1 text-semiLight_gray">
              · 자영업자 : 혼자 운영하는 1인 사업자
            </Text>
            <Text className="text-CAP1 font-CAP1 leading-CAP1 text-semiLight_gray">
              · 소상공인 : 직원 10인 미만의 소규모 사업자
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TargetFilterComponent;
