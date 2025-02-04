import React from 'react';
import { Text, View, Pressable, Dimensions, Image } from 'react-native';

import Icon from '../icon/icon';

export default function AnnouncementHeaderComponent() {
  const width = Dimensions.get('screen').width;

  return (
    <View className="relative bg-light px-5 pb-8 pt-16">
      {/* TODO: 이미지 변경 필요 */}
      <Image
        source={require('@/assets/images/announcement.png')}
        style={{ width: width, height: 214, position: 'absolute' }}
      />
      <View className="relative z-10 w-full gap-y-2.5 ">
        <Text className="font-H1 text-H1 text-[#FFFFFF]">
          모든 지원 공고는{'\n'}여기 다이스에서.
        </Text>
        <Pressable className="flex flex-row items-center gap-x-1 rounded-lg bg-white pb-3.5 pl-[13px] pr-2 pt-[13px]">
          <Icon.Magnifier />
          <Text className="text-medium_gray">원하시는 지역, 모집처, 지원 내용을 검색해보세요</Text>
        </Pressable>
      </View>
    </View>
  );
}
