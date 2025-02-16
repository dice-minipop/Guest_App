import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View, Pressable } from 'react-native';

import Icon from '../icon/icon';

const HeaderComponent: React.FC = () => {
  const router = useRouter();

  return (
    <View className="gap-y-8 bg-white pb-6 border-b border-b-stroke mb-6">
      <Pressable onPress={() => router.back()} className="ml-[3px] flex self-start p-3">
        <Icon.BlackLeftArrow />
      </Pressable>

      <View className="flex flex-row items-center gap-x-2 px-5">
        <Text className="font-H1 text-H1 leading-H1 text-black">쪽지함</Text>
        <Icon.FilledSend />
      </View>
    </View>
  );
};

export default HeaderComponent;
