import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonContainer from '@/components/onBoard/buttonContainer';
import CarouselComponent from '@/components/onBoard/carousel';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 설명 이미지 Carousel */}
      <CarouselComponent />
      {/* 하단 버튼 Container */}
      <ButtonContainer />
    </SafeAreaView>
  );
}
