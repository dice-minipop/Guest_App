import type { Meta } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';

import SpaceBadge from './spaceBadge';

const meta: Meta<typeof SpaceBadge> = {
  title: 'Space',
  component: SpaceBadge,
};
export default meta;

export const FemaleBadge = () => (
  <View className="flex-1 flex flex-col gap-y-[16px]">
    <Text className="mx-[20px] H2">공간 뱃지 여성 나이대 별 Story</Text>

    <View className="h-[40px]">
      <SpaceBadge badgeString="10대 이하 여성 방문 상위 10%" />
    </View>
    <View className="h-[40px]">
      <SpaceBadge badgeString="20대 여성 방문 상위 10%" />
    </View>
    <View className="h-[40px]">
      <SpaceBadge badgeString="30대 여성 방문 상위 10%" />
    </View>
    <View className="h-[40px]">
      <SpaceBadge badgeString="40대 여성 방문 상위 10%" />
    </View>
    <View className="h-[40px]">
      <SpaceBadge badgeString="50대 여성 방문 상위 10%" />
    </View>
    <View className="h-[40px]">
      <SpaceBadge badgeString="60대 이상 여성 방문 상위 10%" />
    </View>
  </View>
);

export const MaleBadge = () => (
  <View className="flex-1 flex flex-col gap-y-[16px]">
    <Text className="mx-[20px] H2">공간 뱃지 남성 나이대 별 Story</Text>

    <View className="h-[40px]">
      <SpaceBadge badgeString="10대 이하 남성 방문 상위 10%" />
    </View>
    <View className="h-[40px]">
      <SpaceBadge badgeString="20대 남성 방문 상위 10%" />
    </View>
    <View className="h-[40px]">
      <SpaceBadge badgeString="30대 남성 방문 상위 10%" />
    </View>
    <View className="h-[40px]">
      <SpaceBadge badgeString="40대 남성 방문 상위 10%" />
    </View>
    <View className="h-[40px]">
      <SpaceBadge badgeString="50대 남성 방문 상위 10%" />
    </View>
    <View className="h-[40px]">
      <SpaceBadge badgeString="60대 이상 남성 방문 상위 10%" />
    </View>
  </View>
);
