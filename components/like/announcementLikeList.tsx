import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, FlatList, Text, View } from 'react-native';

import { useGetLikedAnnouncementLists } from '@/hooks/guest/guest';

import AnnouncementItemComponent from '../announcement/item/announcementItem';

export default function AnnouncementLikeList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isError } = useGetLikedAnnouncementLists();
  const likedAnnouncementData = data?.pages.flatMap((page) => page.content) ?? [];

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="BODY1 text-red">잘못된 요청입니다!</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 64 }}
      data={isLoading ? Array.from({ length: 3 }).map(() => null) : likedAnnouncementData}
      keyExtractor={(item, index) => (item ? String(item.id) : `skeleton-${index}`)}
      renderItem={({ item, index }) =>
        item ? (
          <AnnouncementItemComponent key={item.id} data={item} />
        ) : (
          <AnnouncementSkeletonItem key={index} />
        )
      }
      ListEmptyComponent={() => (
        <View className="flex-1 justify-center items-center">
          <Text className="BODY1 text-medium_gray">좋아요한 공고가 없어요!</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View className="h-[16px]" />}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
    />
  );
}

const AnnouncementSkeletonItem = () => {
  return (
    <View className="border border-stroke rounded-lg mx-[20px] bg-white">
      <ContentLoader
        speed={2}
        width={Dimensions.get('screen').width - 40}
        height={134}
        backgroundColor="#ecebeb"
        foregroundColor="#f3f3f3"
      >
        {/* 주소 */}
        <Rect x="16" y="16" rx="4" ry="4" width="120" height="20" />
        {/* 이름 */}
        <Rect x="16" y="38" rx="4" ry="4" width="260" height="56" />
        {/* 사이즈 */}
        <Rect x="16" y="104" rx="4" ry="4" width="300" height="18" />
      </ContentLoader>
    </View>
  );
};
