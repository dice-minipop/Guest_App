import React, { useState } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import CardComponent from '@/components/popUp/card';
import HeaderComponent from '@/components/like/header';
import { useGetLikedAnnouncementLists, useGetLikedSpaceLists } from '@/hooks/guest/guest';
import RecruitItemComponent from '@/components/announcement/announcementItem';
import { useToggleSpaceLike, useToggleAnnouncementLike } from '@/hooks/like/like';

const LikeScreen = () => {
  const [type, setType] = useState<string>('space');

  const handleType = () => {
    if (type === 'space') {
      setType('announcement');
    } else {
      setType('space');
    }
  };

  const { data: spaceLists, refetch: refetchSpace } = useGetLikedSpaceLists();
  const { mutateAsync: spaceLike } = useToggleSpaceLike(refetchSpace);

  const { data: announcementLists, refetch: refetchAnnouncement } = useGetLikedAnnouncementLists();
  const { mutateAsync: announcementLike } = useToggleAnnouncementLike(refetchAnnouncement);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {type === 'space' ? (
          <FlatList
            stickyHeaderIndices={[0]}
            // 렌더링하는 전체 데이터
            data={spaceLists.content}
            // 각 아이템의 key 값 지정
            keyExtractor={(item) => item.id.toString()}
            // 아이템들을 렌더링하는 메서드
            renderItem={({ item }) => (
              <View className="px-5">
                <CardComponent spaceData={item} toggleLike={spaceLike} />
              </View>
            )}
            // FlatList의 최상단에 렌더링되는 Header 아이템
            ListHeaderComponent={<HeaderComponent type={type} handleType={handleType} />}
            // FlatList의 최하단에 렌더링되는 Footer 아이템
            ListFooterComponent={<View className="h-16" />}
            // 렌더링 되는 아이템들 사이의 간격
            ItemSeparatorComponent={() => <View className="h-4" />}
          />
        ) : (
          <FlatList
            stickyHeaderIndices={[0]}
            // 렌더링하는 전체 데이터
            data={announcementLists.content}
            // 각 아이템의 key 값 지정
            keyExtractor={(item) => item.id.toString()}
            // 아이템들을 렌더링하는 메서드
            renderItem={({ item }) => (
              <View className="px-5">
                <RecruitItemComponent recruitItem={item} toggleLike={announcementLike} />
              </View>
            )}
            // FlatList의 최상단에 렌더링되는 Header 아이템
            ListHeaderComponent={<HeaderComponent type={type} handleType={handleType} />}
            // FlatList의 최하단에 렌더링되는 Footer 아이템
            ListFooterComponent={<View className="h-16" />}
            // 렌더링 되는 아이템들 사이의 간격
            ItemSeparatorComponent={() => <View className="h-4" />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LikeScreen;
