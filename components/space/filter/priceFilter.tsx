import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import RangeSlider from 'rn-range-slider';

import Icon from '@/components/icon/icon';
import { useSpaceFilteringStore } from '@/zustands/filter/store';

const PriceFilterComponent: React.FC = () => {
  const { filtering, setFiltering, deleteFiltering } = useSpaceFilteringStore();

  const handleValue = useCallback(
    (low: number, high: number) => {
      if (low === 0 && high === 300000) {
        deleteFiltering('minPrice');
        deleteFiltering('maxPrice');
      } else if (low >= 50000 && high === 300000) {
        setFiltering('minPrice', low);
        setFiltering('maxPrice', 300000);
      } else if (low === 300000) {
        setFiltering('minPrice', 300000);
        deleteFiltering('maxPrice');
      } else {
        setFiltering('minPrice', low);
        setFiltering('maxPrice', high);
      }
    },
    [setFiltering, deleteFiltering],
  );

  const formatPrice = (minPrice: number | undefined, maxPrice: number | undefined) => {
    if (minPrice === undefined && maxPrice === undefined) {
      return (
        <Text className="flex flex-row items-center font-SUB1 text-SUB1">
          <Text className="font-SUB1 text-SUB1 text-black">
            <Text className="text-purple">0</Text>원
          </Text>
          {' ~ '}
          <Text className="font-SUB1 text-SUB1 text-black">
            <Text className="text-purple">30</Text>만원
          </Text>
        </Text>
      );
    } else if (minPrice !== undefined && maxPrice === undefined) {
      return (
        <Text className="flex flex-row items-center font-SUB1 text-SUB1">
          <Text className="font-SUB1 text-SUB1 text-black">
            <Text className="text-purple">{minPrice / 10000}</Text>만원 이상
          </Text>
        </Text>
      );
    } else {
      return (
        <Text className="flex flex-row items-center font-SUB1 text-SUB1">
          <Text className="font-SUB1 text-SUB1 text-black">
            <Text className="text-purple">{minPrice! / 10000}</Text>만원
          </Text>
          {' ~ '}
          <Text className="font-SUB1 text-SUB1 text-black">
            <Text className="text-purple">{maxPrice! / 10000}</Text>만원
          </Text>
        </Text>
      );
    }
  };

  return (
    <View className="gap-y-6">
      <Text className="font-CAP1 text-CAP1 text-dark_gray">가격</Text>
      <View className="gap-y-8">
        <View className="flex flex-row items-center gap-x-2">
          <Text className="rounded-full border border-stroke bg-back_gray px-3 py-[5.5px] font-BTN1 text-BTN1 text-deep_gray">
            1일 대여
          </Text>
          {formatPrice(filtering.minPrice, filtering.maxPrice)}
        </View>
      </View>

      <View className="gap-y-0.5" onTouchEnd={(e) => e.stopPropagation()}>
        <RangeSlider
          // 범위의 최솟값
          min={0}
          // 범위의 최댓값
          max={300000}
          // 범위가 증가/감소하는 단계
          step={50000}
          // 사용자가 지정한 최솟값
          low={filtering.minPrice}
          // 사용자가 지정한 최댓값
          high={filtering.maxPrice}
          // 슬라이더의 버튼
          renderThumb={() => <Icon.SliderThumb />}
          // 슬라이더의 줄 (선택 X)
          renderRail={() => <View className="h-1 bg-back_gray" />}
          // 슬라이더의 줄 (선택 O)
          renderRailSelected={() => <View className="h-1 bg-black" />}
          // 값 변경 메서드
          onValueChanged={handleValue}
        />
        <View className="flex flex-row justify-between">
          <Text className="font-CAP1 text-CAP1 leading-CAP1 text-light_gray ml-1.5">0원</Text>
          <Text className="font-CAP1 text-CAP1 leading-CAP1 text-light_gray ml-3">15만원</Text>
          <Text className="font-CAP1 text-CAP1 text-light_gray">30만원</Text>
        </View>
      </View>
    </View>
  );
};

export default PriceFilterComponent;
