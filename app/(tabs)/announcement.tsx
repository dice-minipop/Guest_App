import { useCallback, useState } from 'react';
import { RefreshControl, SectionList, View } from 'react-native';

import FilteringContainer from '@/components/announcement/filteringContainer';
import HeaderComponent from '@/components/announcement/header';
import AnnouncementItemComponent from '@/components/common/announcementItem';
import CoverViewComponent from '@/components/common/coverView';
import TopNavigationComponent from '@/components/tabs/topNavigation';
import { dummyData } from '@/constants/dummyData/announcementList';
import { useGetAnnouncementLists } from '@/hooks/announcement/announcement';

export default function Announcement() {
  // const { data, fetchNextPage, hasNextPage, refetch } = useGetAnnouncementLists(filtering);
  const data = dummyData;

  const [selectedFilter, setSelectedFilter] = useState<string>('');

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
        // sections={[{ title: 'CHIP', data: data.pages.flatMap((page) => page.content) }]}
        sections={[{ title: 'CHIP', data: data }]}
        ListHeaderComponent={<HeaderComponent />}
        renderSectionHeader={({ section }) =>
          section.title === 'CHIP' ? (
            <FilteringContainer
              items={['지역', '지원대상', '모집상태']}
              selectedFilter={selectedFilter}
              handleFilter={(e: string) => setSelectedFilter(e)}
            />
          ) : null
        }
        renderItem={({ item }) => <AnnouncementItemComponent key={item.id} data={item} />}
        ItemSeparatorComponent={() => <View className="h-[16px]" />}
        onEndReachedThreshold={0.5}
        // onEndReached={() => {
        //   if (hasNextPage) {
        //     fetchNextPage();
        //   }
        // }}
      />
    </View>
  );
}
