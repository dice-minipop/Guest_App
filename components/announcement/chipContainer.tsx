import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useAnnouncementFilteringStore } from '@/zustands/filter/store';

import Icon from '../icon/icon';

interface ChipContainerProps {
  chipList: string[];
  openModal: (text: string) => void;
}

const ChipContainer: React.FC<ChipContainerProps> = ({ chipList, openModal }) => {
  const { isRefetched, filtering } = useAnnouncementFilteringStore();

  const handleStatus = (status: string) => {
    if (status === 'RECRUITING') {
      return '모집 중';
    } else if (status === 'RECRUITING') {
      return '모집 예정';
    } else {
      return '모집 마감';
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

    if (chip === '지원대상') {
      return (
        <Pressable
          key={key}
          onPress={() => openModal(chip)}
          className={`mr-1.5 flex flex-row items-center gap-x-0.5 rounded-full border pr-2 py-[5.5px] pl-3 ${isRefetched && 'targets' in filtering ? 'border-black bg-black' : 'border-stroke bg-back_gray'}`}
        >
          <Text
            className={`font-BTN1 text-BTN1 leading-BTN1 ${isRefetched && 'targets' in filtering ? 'text-white' : 'text-deep_gray'} `}
          >
            {isRefetched && 'targets' in filtering && filtering.targets !== undefined
              ? filtering.targets.join(', ')
              : chip}
          </Text>
          <Icon.ChipDownArrow size={16} />
        </Pressable>
      );
    }

    if (chip === '모집상태') {
      return (
        <Pressable
          key={key}
          onPress={() => openModal(chip)}
          className={`mr-1.5 flex flex-row items-center gap-x-0.5 rounded-full border pr-2 py-[5.5px] pl-3 ${isRefetched && 'status' in filtering ? 'border-black bg-black' : 'border-stroke bg-back_gray'}`}
        >
          <Text
            className={`font-BTN1 text-BTN1 leading-BTN1 ${isRefetched && 'status' in filtering ? 'text-white' : 'text-deep_gray'} `}
          >
            {isRefetched && 'status' in filtering && filtering.status !== undefined
              ? handleStatus(filtering.status)
              : chip}
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
