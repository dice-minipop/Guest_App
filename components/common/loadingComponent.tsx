import React from 'react';
import { View, Image } from 'react-native';
import { Portal } from 'react-native-portalize';

const LoadingComponent: React.FC = () => {
  return (
    <Portal>
      <View className="h-screen w-screen items-center justify-center bg-white">
        <Image
          source={require('../../assets/images/loading.gif')}
          alt="로딩"
          className="w-[200px] h-[200px]"
        />
      </View>
    </Portal>
  );
};

export default LoadingComponent;
