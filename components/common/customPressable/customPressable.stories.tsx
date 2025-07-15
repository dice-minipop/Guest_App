import type { Meta } from '@storybook/react-native';
import React from 'react';
import { ScrollView, Text } from 'react-native';

import CustomPressableComponent from './customPressable';

const meta: Meta<typeof CustomPressableComponent> = {
  title: 'Common',
  component: CustomPressableComponent,
};
export default meta;

globalThis.__STORYBOOK__ = true;

export const CustomPressableList = () => {
  return (
    <ScrollView contentContainerStyle={{ flexDirection: 'column', rowGap: 16, paddingBottom: 80 }}>
      <Text className="mx-[20px] H2">버튼 상태 별 Story</Text>
      <CustomPressableComponent
        buttonText="Button"
        onPress={() => {}}
        disabled={false}
        color="BLACK"
      />
      <CustomPressableComponent
        buttonText="Button"
        onPress={() => {}}
        disabled={false}
        color="BLACK"
        icon="DICE"
      />
      <CustomPressableComponent
        buttonText="Button"
        onPress={() => {}}
        disabled={false}
        color="WHITE"
        arrow="DOWN"
      />
      <CustomPressableComponent
        buttonText="Button"
        onPress={() => {}}
        disabled={true}
        color="GRAY"
      />
      <CustomPressableComponent
        buttonText="Button"
        onPress={() => {}}
        disabled={false}
        color="WHITE"
        arrow="UP"
      />
      <CustomPressableComponent
        buttonText="Button"
        onPress={() => {}}
        disabled={false}
        color="WHITE"
      />
      <CustomPressableComponent
        buttonText="Button"
        onPress={() => {}}
        disabled={false}
        color="WHITE"
        icon="GLOBE"
      />
    </ScrollView>
  );
};
