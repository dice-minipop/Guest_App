import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, View } from 'react-native';

const Splash = () => {
  return (
    <View className="w-screen h-screen items-center justify-center bg-black">
      <StatusBar style="light" />
      <Image source={require('@/assets/images/splash_icon.png')} width={180} height={100} />
    </View>
  );
};

export default Splash;
