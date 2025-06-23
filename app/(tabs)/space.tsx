import { useCallback, useState } from 'react';
import { RefreshControl, SectionList, View } from 'react-native';

import CoverViewComponent from '@/components/common/coverView';
import SpaceItemComponent from '@/components/common/spaceItem';
import FilteringContainer from '@/components/space/filteringContainer';
import HeaderComponent from '@/components/space/header';
import TopNavigationComponent from '@/components/tabs/topNavigation';
import { SpacedummyData } from '@/constants/dummyData/spaceList';
import { useGetFilteredSpaceLists } from '@/hooks/space/space';

export default function Space() {
  // const { data, fetchNextPage, hasNextPage, refetch } = useGetFilteredSpaceLists(filtering);
  const data = SpacedummyData;

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const onRefresh = useCallback(() => {
    // refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View className="flex-1 bg-white">
      <TopNavigationComponent title="팝업 공간" />
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
              items={['지역', '가격', '수용인원', '정렬']}
              selectedFilter={selectedFilter}
              handleFilter={(e: string) => setSelectedFilter(e)}
            />
          ) : null
        }
        renderItem={({ item }) => <SpaceItemComponent key={item.id} data={item} />}
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
