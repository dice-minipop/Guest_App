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
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useGetAnnouncementLists(announcementFilter);

  const announcementData =
    data?.pages.flatMap((page) => page.content.map((item) => ({ ...item }))) || [];

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
