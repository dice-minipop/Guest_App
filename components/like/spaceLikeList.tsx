import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, FlatList, Text, View } from 'react-native';

import { useGetLikedSpaceLists } from '@/hooks/guest/guest';

import SpaceItemComponent from '../space/item/spaceItem';

export default function SpaceLikeList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isError } = useGetLikedSpaceLists();
  const likedSpaceData = data?.pages.flatMap((page) => page.content) || [];

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
      data={isLoading ? Array.from({ length: 3 }).map(() => null) : likedSpaceData}
      keyExtractor={(item, index) => (item ? String(item.id) : `skeleton-${index}`)}
      renderItem={({ item, index }) =>
        item ? <SpaceItemComponent key={item.id} data={item} /> : <SpaceSkeletonItem key={index} />
      }
      ListEmptyComponent={() => (
        <View className="flex-1 justify-center items-center">
          <Text className="BODY1 text-medium_gray">좋아요한 공간이 없어요!</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View className="h-[16px]" />}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
    />
  );
}

const SpaceSkeletonItem = () => {
  return (
    <View className="border border-stroke rounded-lg mx-[20px] bg-white">
      <ContentLoader
        speed={2}
        width={Dimensions.get('screen').width - 40}
        height={336}
        backgroundColor="#ecebeb"
        foregroundColor="#f3f3f3"
      >
        {/* 상단 이미지 */}
        <Rect x="0" y="0" rx="8" ry="8" width={Dimensions.get('screen').width - 40} height="188" />

        {/* 주소 */}
        <Rect x="16" y="196" rx="4" ry="4" width="120" height="20" />
        {/* 이름 */}
        <Rect x="16" y="218" rx="4" ry="4" width="180" height="28" />
        {/* 사이즈 */}
        <Rect x="16" y="250" rx="4" ry="4" width="60" height="18" />

        {/* 가격 영역 */}
        <Rect
          x={Dimensions.get('screen').width - 40 - 100}
          y="270"
          rx="4"
          ry="4"
          width="80"
          height="20"
        />
        <Rect
          x={Dimensions.get('screen').width - 40 - 140}
          y="292"
          rx="4"
          ry="4"
          width="120"
          height="28"
        />
      </ContentLoader>
    </View>
  );
};
