import { useRouter } from 'expo-router';
import React from 'react';
import { View, Pressable } from 'react-native';

import Icon from '../icon/icon';

import SwitchComponent from './switch';

interface HeaderComponentProps {
  type: string;
  handleType: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ type, handleType }) => {
  const router = useRouter();

  return (
    <View className="bg-white pb-6">
      <Pressable onPress={() => router.back()} className="ml-[3px] flex self-start p-3">
        <Icon.BlackLeftArrow />
      </Pressable>

      {/* 찜한 공간과 찜한 공고 type을 전환하는 스위치 컴포넌트 */}
      <SwitchComponent type={type} handleType={handleType} />
    </View>
  );
};

export default HeaderComponent;
