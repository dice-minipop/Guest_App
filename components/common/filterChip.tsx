import React from 'react';
import { Text, Pressable } from 'react-native';

import Icon from '../icon/icon';

interface FilterChipProps {
  title: string;
  openModal: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ title, openModal }) => {
  return (
    <Pressable
      onPress={openModal}
      className="mr-1.5 flex flex-row items-center gap-x-0.5 rounded-full border border-stroke bg-back_gray pr-2 py-[5.5px] pl-3"
    >
      <Text className="font-BTN1 text-BTN1 leading-BTN1 text-deep_gray">{title}</Text>
      <Icon.ChipDownArrow size={16} />
    </Pressable>
  );
};

export default FilterChip;
