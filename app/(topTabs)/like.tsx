import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AnnouncementItemComponent from '@/components/common/announcementItem';
import BackHeaderComponent from '@/components/common/backHeader';
import SpaceItemComponent from '@/components/common/spaceItem';
import LikeSwitchComponent from '@/components/like/likeSwitch';
import { dummyData } from '@/constants/dummyData/announcementList';
import { SpacedummyData } from '@/constants/dummyData/spaceList';
import { useGetLikedAnnouncementLists, useGetLikedSpaceLists } from '@/hooks/guest/guest';
import { AnnouncementItem } from '@/types/announcement';
import { SpaceItem } from '@/types/space';

export default function Like() {
  const spaceData = SpacedummyData;
  const announcementData = dummyData;

  // const {
  //   data: spaceData,
  //   fetchNextPage: fetchSpaceNextPage,
  //   hasNextPage: hasSpaceNextPage,
  // } = useGetLikedSpaceLists();

  // const {
  //   data: announcementData,
  //   fetchNextPage: fetchAnnouncementNextPage,
  //   hasNextPage: hasAnnouncementNextPage,
  // } = useGetLikedAnnouncementLists();

  const [currentType, setCurrentType] = useState<'SPACE' | 'ANNOUNCEMENT'>('SPACE');

  const handleType = () => {
    if (currentType === 'SPACE') {
      setCurrentType('ANNOUNCEMENT');
    } else {
      setCurrentType('SPACE');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" hasSafeArea={false}>
        <LikeSwitchComponent currentType={currentType} handleType={handleType} />
      </BackHeaderComponent>

      <FlatList<SpaceItem | AnnouncementItem>
        contentContainerStyle={{ paddingBottom: 64, paddingTop: 24 }}
        // data={
        //   currentType === 'SPACE'
        //     ? spaceData?.pages.flatMap((page) => page.content)
        //     : announcementData?.pages.flatMap((page) => page.content)
        // }
        data={currentType === 'SPACE' ? spaceData : announcementData}
        renderItem={({ item }) =>
          currentType === 'SPACE' ? (
            <SpaceItemComponent key={item.id} data={item as SpaceItem} />
          ) : (
            <AnnouncementItemComponent key={item.id} data={item as AnnouncementItem} />
          )
        }
        ItemSeparatorComponent={() => <View className="h-[16px]" />}
        onEndReachedThreshold={0.5}
        // onEndReached={() => {
        //   if (currentType === 'SPACE') {
        //     if (hasSpaceNextPage) {
        //       fetchSpaceNextPage();
        //     }
        //   } else {
        //     if (hasAnnouncementNextPage) {
        //       fetchAnnouncementNextPage();
        //     }
        //   }
        // }}
      />
    </SafeAreaView>
  );
}
