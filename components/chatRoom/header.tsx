import { useRouter } from 'expo-router';
import React from 'react';
import { View, Pressable, Text } from 'react-native';

import { useSpaceDataStore } from '@/zustands/space/store';

import Icon from '../icon/icon';

interface HeaderComponentProps {
  openReportModal: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ openReportModal }) => {
  const router = useRouter();

  const { spaceName, setSpaceName } = useSpaceDataStore();

  return (
    <View className="bg-white flex flex-row justify-between px-1">
      <Pressable
        onPress={() => {
          router.back();
          setSpaceName('');
        }}
        className="p-3"
      >
        <Icon.BlackLeftArrow />
      </Pressable>

      <Text className="absolute left-1/2 -translate-x-1/2 text-SUB2 font-SUB2 leading-SUB2 py-2">
        {spaceName}
      </Text>

      <Pressable onPress={openReportModal} className="p-3">
        <Icon.Siren />
      </Pressable>
    </View>
  );
};

export default HeaderComponent;
