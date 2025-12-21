import { useCallback, useState } from 'react';
import { View, SectionList, RefreshControl } from 'react-native';

import FilteringContainer from '@/components/announcement/filtering/filteringContainer';
import HeaderComponent from '@/components/announcement/header';
import AnnouncementItemComponent from '@/components/announcement/item/announcementItem';
import AnnouncementSkeletonItem from '@/components/announcementSkeleton';
import CoverViewComponent from '@/components/common/coverView';
import TopNavigationComponent from '@/components/tabs/topNavigation';
import { useGetAnnouncementLists } from '@/hooks/announcement/announcement';
import { useAnnouncementFilterStore } from '@/zustands/filter/announcement';

export default function Announcement() {
  const { announcementFilter } = useAnnouncementFilterStore();

  // API 호출용 필터: "전국"은 undefined로 변환
  const apiFilter = {
    ...announcementFilter,
    city: announcementFilter.city === '전국' ? undefined : announcementFilter.city,
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetAnnouncementLists(apiFilter);

  const announcementData = data?.pages.flatMap((page) =>
    page.content.map((item) => ({ ...item })),
  ) || [
    {
      city: '경기',
      district: '의정부시',
      hostName: ' 신세계백화점(의정부점)',
      id: 1,
      isLiked: false,
      likeCount: 28,
      recruitmentEndAt: '2025-06-08T23:59:59',
      recruitmentStartAt: '2025-06-05T00:00:00',
      status: 'RECRUITING',
      target: '자영업자',
      title: '2025 업사이클팝업스토어 [RE] 모집',
    },
    {
      city: '서울',
      district: '노원구',
      hostName: '갤러리',
      id: 2,
      isLiked: true,
      likeCount: 21,
      recruitmentEndAt: '2025-06-10T00:00:00',
      recruitmentStartAt: '2025-05-27T00:00:00',
      status: 'RECRUITING',
      target: '자영업자',
      title: '노원구 청년 팝업스토어 하계점',
    },
  ];

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    // refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View className="flex-1 bg-white">
      <TopNavigationComponent title="팝업 지원 공고" />

      <CoverViewComponent height={500} top={-100} />

      <SectionList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 64, backgroundColor: '#FFFFFF' }}
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
            data: isLoading
              ? Array.from({ length: 3 }).map(() => null) // Skeleton용
              : announcementData,
          },
        ]}
        ListHeaderComponent={<HeaderComponent />}
        renderSectionHeader={({ section }) =>
          section.title === 'CHIP' ? (
            <FilteringContainer items={['지역', '지원대상', '모집상태', '정렬']} />
          ) : null
        }
        stickySectionHeadersEnabled={true}
        renderItem={({ item, index }) =>
          item ? (
            <AnnouncementItemComponent key={item.id} data={item} />
          ) : (
            <AnnouncementSkeletonItem key={index} />
          )
        }
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
