import { useRouter } from 'expo-router';
import React from 'react';
import { View, Pressable } from 'react-native';

// import BackArrow from "@assets/blackLeftArrow.svg";

const HeaderComponent: React.FC = () => {
  const router = useRouter();

  return (
    <View className="bg-white">
      <Pressable onPress={() => router.back()} className="ml-[3px] flex self-start p-3">
        {/* <BackArrow /> */}
      </Pressable>
    </View>
  );
};

export default HeaderComponent;
