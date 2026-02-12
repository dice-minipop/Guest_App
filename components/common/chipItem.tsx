import { Text, View } from 'react-native';

import SmallGrayDownArrowIcon from '@/assets/icons/small-grayDownArrow.svg';

interface ChipItemComponentProps {
  label: string;
  isActive?: boolean;
}

export default function ChipItemComponent({ label, isActive }: ChipItemComponentProps) {
  return (
    <View
      className={`flex flex-row items-center gap-x-[2px] pl-[12px] py-[5.5px] pr-[8px] border border-stroke rounded-full ${isActive ? 'bg-black' : 'bg-back_gray'}`}
    >
      <Text className={`BTN1 ${isActive ? 'text-white' : 'text-deep_gray'}`}>{label}</Text>
      <SmallGrayDownArrowIcon />
    </View>
  );
}
