import { StatusBar } from 'expo-status-bar';
import React, { Suspense, useState } from 'react';
import { View, SectionList, SafeAreaView, Platform } from 'react-native';

import AnnouncementHeaderComponent from '@/components/announcement/announcementHeader';
import AnnouncementItemComponent from '@/components/announcement/announcementItem';
import ChipContainer from '@/components/announcement/chipContainer';
import FilterContainer from '@/components/announcement/filterContainer';
import LoadingComponent from '@/components/common/loadingComponent';
import TopNavigation from '@/components/topNavigation/topNavigation';
import { useGetAnnouncementLists } from '@/hooks/announcement/announcement';
import { useToggleAnnouncementLike } from '@/hooks/like/like';
import { useAnnouncementFilteringStore } from '@/zustands/filter/store';

const AnnouncementScreen = () => {
  const { setIsRefetched, filtering } = useAnnouncementFilteringStore();
  const {
    data: announcementList,
    fetchNextPage,
    hasNextPage,
    refetch,
    isPending,
  } = useGetAnnouncementLists(filtering);

  const { mutateAsync: announcementLike } = useToggleAnnouncementLike(refetch);

  const [filteringType, setFilteringType] = useState<string>('');

  const chipList = ['지역', '지원대상', '모집상태'];

  const handleFilteringType = (type: string) => {
    setFilteringType(type);

    if (filteringType === '') {
      setIsRefetched(false);
    } else {
      setIsRefetched(true);
    }
  };

  return (
    <Suspense>
      <View className="flex-1">
        <StatusBar style="light" />
        {isPending && <LoadingComponent />}
        <SafeAreaView className={`flex-1 bg-black ${Platform.OS === 'android' && 'pt-[50px]'}`}>
          <TopNavigation />
          <View className="flex-1 gap-y-4 bg-white pb-16">
            <SectionList
              sections={[
                { title: 'chip', data: announcementList.pages.flatMap((page) => page.content) },
              ]}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="px-5">
                  <AnnouncementItemComponent recruitItem={item} toggleLike={announcementLike} />
                </View>
              )}
              renderSectionHeader={({ section }) =>
                section.title === 'chip' ? (
                  <ChipContainer chipList={chipList} openModal={handleFilteringType} />
                ) : null
              }
              ListHeaderComponent={<AnnouncementHeaderComponent />}
              ListFooterComponent={<View className="h-16" />}
              ItemSeparatorComponent={() => <View className="h-4" />}
              onEndReached={() => {
                if (hasNextPage) {
                  fetchNextPage();
                }
              }}
              bounces={false}
              nestedScrollEnabled={true}
            />
          </View>
        </SafeAreaView>

        <FilterContainer
          isVisible={filteringType !== ''}
          type={filteringType}
          handleType={handleFilteringType}
        />
      </View>
    </Suspense>
  );
};

export default AnnouncementScreen;
