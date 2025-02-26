import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import RangeSlider from 'rn-range-slider';

import Icon from '@/components/icon/icon';
import { useSpaceFilteringStore } from '@/zustands/filter/store';

const PeopleFilterComponent: React.FC = () => {
  const { filtering, setFiltering, deleteFiltering } = useSpaceFilteringStore();

  const handleValue = useCallback((num: number) => {
    if (num === 100) {
      setFiltering('minCapacity', 100);
      deleteFiltering('maxCapacity'); // maxCapacity 초기화
    } else if (num >= 5 && num <= 95) {
      setFiltering('maxCapacity', num);
      deleteFiltering('minCapacity'); // minCapacity 초기화
    } else {
      deleteFiltering('maxCapacity');
      deleteFiltering('minCapacity');
    }
  }, []);

  return (
    <View className="gap-y-6">
      <Text className="font-CAP1 text-CAP1 text-dark_gray">수용인원</Text>
      <View className="gap-y-8">
        {filtering.minCapacity ? (
          <View>
            <Text className="font-SUB1 text-SUB1 leading-SUB1">
              <Text
                className={`${filtering.maxCapacity === 0 ? 'text-semiLight_gray' : 'text-purple'}`}
              >
                {filtering.minCapacity}
              </Text>{' '}
              명 이상 수용 가능
            </Text>
          </View>
        ) : (
          <View>
            <Text className="font-SUB1 text-SUB1 leading-SUB1">
              최대{' '}
              <Text
                className={`${filtering.maxCapacity === 0 ? 'text-semiLight_gray' : 'text-purple'}`}
              >
                {filtering.maxCapacity || 0}
              </Text>{' '}
              명 수용 가능
            </Text>
          </View>
        )}
      </View>

      <View className="gap-y-0.5">
        <RangeSlider
          disableRange={true}
          // 범위의 최솟값
          min={0}
          // 범위의 최댓값
          max={100}
          // 범위가 증가/감소하는 단계
          step={5}
          // 사용자가 지정한 최댓값
          high={filtering.maxCapacity}
          // 슬라이더의 버튼
          renderThumb={() => <Icon.SliderThumb />}
          // 슬라이더의 줄 (선택 X)
          renderRail={() => <View className="h-1 bg-[#F4F4F4]" />}
          // 슬라이더의 줄 (선택 O)
          renderRailSelected={() => <View className="h-1 bg-black" />}
          // 값 변경 메서드
          onValueChanged={handleValue}
        />
        <View className="flex flex-row items-center justify-between">
          <Text className="font-CAP1 text-CAP1 leading-CAP1 text-light_gray ml-1.5">0명</Text>
          <Text className="font-CAP1 text-CAP1 leading-CAP1 text-light_gray ml-2">50명</Text>
          <Text className="font-CAP1 text-CAP1 leading-CAP1 text-light_gray">100명</Text>
        </View>
      </View>
    </View>
  );
};

export default PeopleFilterComponent;
