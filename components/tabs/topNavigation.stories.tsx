import type { Meta } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';

import TopNavigationComponent from './topNavigation';

const meta: Meta<typeof TopNavigationComponent> = {
  title: 'Common',
  component: TopNavigationComponent,
};
export default meta;

globalThis.__STORYBOOK__ = true;

export const TopNavigations = () => (
  <View className="flex-1 flex flex-col gap-y-[16px]">
    <Text className="mx-[20px] H2">상단 네비게이션 스크린 별 Story</Text>

    <TopNavigationComponent title="팝업 공간" />
    <TopNavigationComponent title="팝업 공간" scrollY={71} />
    <TopNavigationComponent title="팝업 지원 공고" />
    <TopNavigationComponent title="예약 관리" />
  </View>
);
