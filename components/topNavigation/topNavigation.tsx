import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { View, Pressable, Text, Alert } from 'react-native';

import { useGuestStateStore } from '@/zustands/member/store';

import Icon from '../icon/icon';

const TopNavigation: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();

  const { isGuestMode } = useGuestStateStore();

  const handleGuestMode = (path: '/myBrand' | '/like' | '/(myPage)/updateInfo') => {
    if (isGuestMode) {
      Alert.alert('게스트로 둘러보기 상태에서는 이용할 수 없습니다!');
    } else {
      router.push(path);
    }
  };

  return (
    <View className="fixed z-10 flex h-14 w-full flex-row items-center justify-between bg-black p-1 pl-5">
      <Text className="text-white text-SUB1 font-SUB1 leading-SUB1">
        {pathName === '/space' && '팝업 공간'}
        {pathName === '/announcement' && '팝업 지원 공고'}
        {pathName === '/reservation' && '예약 관리'}
      </Text>

      <View className="flex flex-row">
        <Pressable onPress={() => handleGuestMode('/like')} className="p-3">
          <Icon.Like />
        </Pressable>

        {/* <Pressable onPress={() => router.push('/chatBox')} className="p-3">
          <Icon.Send />
        </Pressable> */}
      </View>
    </View>
  );
};

export default TopNavigation;
