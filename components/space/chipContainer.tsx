import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useSpaceFilteringStore } from '@/zustands/filter/store';

import Icon from '../icon/icon';

interface ChipContainerProps {
  chipList: string[];
  openModal: (text: string) => void;
}

const ChipContainer: React.FC<ChipContainerProps> = ({ chipList, openModal }) => {
  const { isRefetched, filtering } = useSpaceFilteringStore();

  const handlePrice = (min: number | undefined, max: number | undefined) => {
    if (min === 300000 && max === 300000) {
      return min / 10000 + '만원 이상';
    } else if (min !== undefined && max !== undefined) {
      return min / 10000 + '~' + max / 10000 + '만원';
    }
    return '';
  };

  const handleSortType = (type: string | undefined) => {
    if (type === 'likeCount') {
      return '인기 순';
    } else if (type === 'latest') {
      return '최신 순';
    } else if (type === 'priceAsc') {
      return '낮은 가격 순';
    } else if (type === 'priceDesc') {
      return '높은 가격 순';
    }
  };

  const handleChip = (chip: string, key: number) => {
    if (chip === '지역') {
      return (
        <Pressable
          key={key}
          onPress={() => openModal(chip)}
          className={`mr-1.5 flex flex-row items-center gap-x-0.5 rounded-full border pr-2 py-[5.5px] pl-3 ${isRefetched && 'district' in filtering ? 'border-black bg-black' : 'border-stroke bg-back_gray'}`}
        >
          <Text
            className={`font-BTN1 text-BTN1 leading-BTN1 ${isRefetched && 'district' in filtering ? 'text-white' : 'text-deep_gray'} `}
          >
            {isRefetched && 'district' in filtering
              ? `${filtering.city} ${filtering.district}`
              : chip}
          </Text>
          <Icon.ChipDownArrow size={16} />
        </Pressable>
      );
    }

    if (chip === '가격') {
      return (
        <Pressable
          key={key}
          onPress={() => openModal(chip)}
          className={`mr-1.5 flex flex-row items-center gap-x-0.5 rounded-full border pr-2 py-[5.5px] pl-3 ${isRefetched && ('minPrice' in filtering || 'maxPrice' in filtering) ? 'border-black bg-black' : 'border-stroke bg-back_gray'}`}
        >
          <Text
            className={`font-BTN1 text-BTN1 leading-BTN1 ${isRefetched && ('minPrice' in filtering || 'maxPrice' in filtering) ? 'text-white' : 'text-deep_gray'} `}
          >
            {isRefetched && ('minPrice' in filtering || 'maxPrice' in filtering)
              ? handlePrice(filtering.minPrice, filtering.maxPrice)
              : chip}
          </Text>
          <Icon.ChipDownArrow size={16} />
        </Pressable>
      );
    }

    if (chip === '수용인원') {
      return (
        <Pressable
          key={key}
          onPress={() => openModal(chip)}
          className={`mr-1.5 flex flex-row items-center gap-x-0.5 rounded-full border pr-2 py-[5.5px] pl-3 ${isRefetched && (filtering.maxCapacity || filtering.minCapacity) ? 'border-black bg-black' : 'border-stroke bg-back_gray'}`}
        >
          <Text
            className={`font-BTN1 text-BTN1 leading-BTN1 ${isRefetched && (filtering.maxCapacity || filtering.minCapacity) ? 'text-white' : 'text-deep_gray'} `}
          >
            {isRefetched && (filtering.maxCapacity || filtering.minCapacity)
              ? filtering.minCapacity
                ? `${filtering.minCapacity}명 이상`
                : `최대 ${filtering.maxCapacity}명`
              : chip}
          </Text>
          <Icon.ChipDownArrow size={16} />
        </Pressable>
      );
    }

    if (chip === '정렬') {
      return (
        <Pressable
          key={key}
          onPress={() => openModal(chip)}
          className={`mr-1.5 flex flex-row items-center gap-x-0.5 rounded-full border pr-2 py-[5.5px] pl-3 ${isRefetched && 'sortBy' in filtering ? 'border-black bg-black' : 'border-stroke bg-back_gray'}`}
        >
          <Text
            className={`font-BTN1 text-BTN1 leading-BTN1 ${isRefetched && 'sortBy' in filtering ? 'text-white' : 'text-deep_gray'} `}
          >
            {isRefetched && 'sortBy' in filtering ? handleSortType(filtering.sortBy) : chip}
          </Text>
          <Icon.ChipDownArrow size={16} />
        </Pressable>
      );
    }
  };

  return (
    <View className="bg-white flex-1">
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          paddingHorizontal: 20,
        }}
      >
        <View className="flex flex-row py-4">
          {chipList.map((chip, index) => handleChip(chip, index))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ChipContainer;
