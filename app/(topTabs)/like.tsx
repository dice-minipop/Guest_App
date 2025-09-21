import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap } from 'react-native-tab-view';

import BackHeaderComponent from '@/components/common/backHeader';
import AnnouncementLikeList from '@/components/like/announcementLikeList';
import LikeSwitchComponent from '@/components/like/likeSwitch';
import SpaceLikeList from '@/components/like/spaceLikeList';

const renderScene = SceneMap({
  space: SpaceLikeList,
  notice: AnnouncementLikeList,
});

export default function LikeListScreen() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'space', title: '공간 좋아요' },
    { key: 'notice', title: '공고 좋아요' },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <BackHeaderComponent style="WHITE" hasSafeArea={false}>
        <LikeSwitchComponent index={index} setIndex={setIndex} />
      </BackHeaderComponent>

      <View className="h-[24px]" />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('screen').width }}
        swipeEnabled={false}
        renderTabBar={() => null}
      />
    </SafeAreaView>
  );
}
