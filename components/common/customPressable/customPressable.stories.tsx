import type { Meta } from '@storybook/react-native';
import React from 'react';
import { ScrollView, Text } from 'react-native';

import CustomPressable from './customPressable';

const meta: Meta<typeof CustomPressable> = {
  title: 'Common',
  component: CustomPressable,
};
export default meta;

globalThis.__STORYBOOK__ = true;

export const CustomPressableList = () => {
  return (
    <ScrollView contentContainerStyle={{ flexDirection: 'column', rowGap: 16, paddingBottom: 80 }}>
      <Text className="mx-[20px] H2">버튼 상태 별 Story</Text>
      <CustomPressable buttonText="Button" onPress={() => {}} disabled={false} color="BLACK" />
      <CustomPressable
        buttonText="Button"
        onPress={() => {}}
        disabled={false}
        color="BLACK"
        icon="DICE"
      />
      <CustomPressable
        buttonText="Button"
        onPress={() => {}}
        disabled={false}
        color="WHITE"
        arrow="DOWN"
      />
      <CustomPressable buttonText="Button" onPress={() => {}} disabled={true} color="GRAY" />
      <CustomPressable
        buttonText="Button"
        onPress={() => {}}
        disabled={false}
        color="WHITE"
        arrow="UP"
      />
      <CustomPressable buttonText="Button" onPress={() => {}} disabled={false} color="WHITE" />
      <CustomPressable
        buttonText="Button"
        onPress={() => {}}
        disabled={false}
        color="WHITE"
        icon="GLOBE"
      />
    </ScrollView>
  );
};
