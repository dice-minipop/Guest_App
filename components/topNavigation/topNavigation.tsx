import { router, usePathname } from 'expo-router';
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import Icon from '../icon/icon';
import { colors } from '@/constants/Colors';

const TopNavigation: React.FC = () => {
  const pathName = usePathname();

  return (
    <View className="fixed z-10 flex h-14 w-full flex-row items-center justify-between bg-black p-1 pl-5">
      <Text className="text-white text-SUB1 font-SUB1 leading-SUB1">
        {pathName === '/space' ? '팝업 공간' : '팝업 지원 공고'}
      </Text>

      <View className="flex flex-row">
        <Pressable onPress={() => router.push('/like')} className="p-3">
          <Icon.Like stroke={colors.deep_gray} />
        </Pressable>

        <Pressable onPress={() => router.push('/chatBox')} className="p-3">
          <Icon.Send />
        </Pressable>
      </View>
    </View>
  );
};

export default TopNavigation;
