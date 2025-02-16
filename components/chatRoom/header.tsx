import { useRouter } from 'expo-router';
import React from 'react';
import { View, Pressable } from 'react-native';

import Icon from '../icon/icon';

const HeaderComponent: React.FC = () => {
  const router = useRouter();

  return (
    <View className="bg-white flex flex-row justify-between px-1">
      <Pressable onPress={() => router.back()} className="p-3">
        <Icon.BlackLeftArrow />
      </Pressable>

      <Pressable onPress={() => router.back()} className="p-3">
        <Icon.Siren />
      </Pressable>
    </View>
  );
};

export default HeaderComponent;
