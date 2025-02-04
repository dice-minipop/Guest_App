import React from 'react';
import { View, Text, Pressable, Dimensions, Image } from 'react-native';
import Icon from '../icon/icon';

const HeaderComponent: React.FC = () => {
  const width = Dimensions.get('screen').width;

  return (
    <View className="relative px-5 pb-8 pt-16">
      <Image
        source={require('@/assets/images/space.png')}
        style={{ width: width, height: 214, position: 'absolute' }}
      />
      <View className="relative z-10 w-full gap-y-2.5">
        <Text className="font-H1 text-H1 text-[#FFFFFF]">
          저렴한 팝업 공간은{'\n'}쉽게 다이스에서.
        </Text>

        <Pressable className="flex flex-row items-center gap-x-1 rounded-lg bg-white pb-3.5 pl-[13px] pr-2 pt-[13px]">
          <Icon.Magnifier />
          <Text className="text-medium_gray">찾는 지역이나 지하철역으로 검색해보세요</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderComponent;
