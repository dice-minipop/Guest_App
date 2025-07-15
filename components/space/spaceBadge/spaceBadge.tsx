import React from 'react';
import { Text, View } from 'react-native';

import PeopleIcon from '@/assets/icons/people';

import { badgeColorMap } from './spaceBadgeMap';

interface SpaceBadgeProps {
  badgeString: string;
}

const SpaceBadge: React.FC<SpaceBadgeProps> = ({ badgeString }) => {
  const colors = badgeColorMap[badgeString] ?? {
    bg: '',
    text: 'text-white',
    icon: '#FFFFFF',
  };

  return (
    <View
      className={`absolute top-[16px] left-[16px] flex flex-row items-center gap-x-[4px] px-[6px] py-[3px] rounded-[4px] ${colors.bg}`}
    >
      <PeopleIcon fill={colors.icon} />
      <Text className={`CAP2 ${colors.text}`}>{badgeString}</Text>
    </View>
  );
};

export default SpaceBadge;
