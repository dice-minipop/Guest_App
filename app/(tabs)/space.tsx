import { useCallback, useState } from 'react';
import { View, SectionList, RefreshControl } from 'react-native';

import CoverViewComponent from '@/components/common/coverView';
import FilteringContainer from '@/components/space/filteringContainer';
import HeaderComponent from '@/components/space/header';
import SpaceItemComponent from '@/components/space/item/spaceItem';
import SpaceSkeletonItem from '@/components/spaceSkeleton';
import TopNavigationComponent from '@/components/tabs/topNavigation';
import { useGetFilteredSpaceLists } from '@/hooks/space/space';
import { useSpaceFilterStore } from '@/zustands/filter/space';

export default function Space() {
  const [scrollY, setScrollY] = useState<number>(0);

  const { spaceFilter } = useSpaceFilterStore();

  const { data, isFetching, fetchNextPage, hasNextPage } = useGetFilteredSpaceLists(spaceFilter);
  const spaceData = data?.pages.flatMap((page) => page.content.map((item) => ({ ...item }))) || [
    {
      id: 1,
      name: '공간 이름',
      address: '서울시 강남구 테헤란로 123',
      city: '서울',
      district: '강남구',
      imageUrl: 'www.example.com',
      pricePerDay: 10000,
      discountRate: 10,
      discountPrice: 9000,
      size: 30,
      likeCount: 10,
      square: 50,
      isLiked: true,
      isActivated: true,
      badge: '20대 여성 방문 상위 10%',
    },
    {
      id: 2,
      name: '공간 이름',
      address: '서울시 강남구 테헤란로 123',
      city: '서울',
      district: '강남구',
      imageUrl: 'www.example.com',
      pricePerDay: 10000,
      discountRate: 10,
      discountPrice: 9000,
      size: 30,
      likeCount: 10,
      square: 50,
      isLiked: true,
      isActivated: true,
      badge: '20대 여성 방문 상위 10%',
    },
  ];

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View className="flex-1 bg-white">
      <TopNavigationComponent title="팝업 공간" scrollY={scrollY} />

      <CoverViewComponent height={500} top={-100} />

      <SectionList
        onScroll={(e) => {
          setScrollY(e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 64, backgroundColor: '#FFFFFF' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={'#FFFFFF'}
            title="조회중"
            tintColor={'#FFFFFF'}
            titleColor={'#FFFFFF'}
          />
        }
        sections={[
          {
            title: 'CHIP',
            data: isFetching
              ? Array.from({ length: 3 }).map(() => null) // Skeleton용
              : spaceData,
          },
        ]}
        ListHeaderComponent={<HeaderComponent />}
        renderSectionHeader={({ section }) =>
          section.title === 'CHIP' ? (
            <FilteringContainer items={['지역', '유동인구', '가격', '공간크기', '정렬']} />
          ) : null
        }
        stickySectionHeadersEnabled={true}
        renderItem={({ item, index }) =>
          item ? (
            <SpaceItemComponent key={item.id} data={item} />
          ) : (
            <SpaceSkeletonItem key={index} />
          )
        }
        keyExtractor={(item, index) => (item ? `${item.id}` : `skeleton-${index}`)}
        ItemSeparatorComponent={() => <View className="h-[16px]" />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />
    </View>
  );
}
