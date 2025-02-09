import React, { Suspense, useEffect, useState } from 'react';
import { View, SectionList, SafeAreaView } from 'react-native';

import TopNavigation from '@/components/topNavigation/topNavigation';

import AnnouncementItemComponent from '@/components/announcement/announcementItem';
import AnnouncementHeaderComponent from '@/components/announcement/announcementHeader';
import { StatusBar } from 'expo-status-bar';
import { useGetAnnouncementLists } from '@/hooks/announcement/announcement';
import ChipContainer from '@/components/common/chipContainer';
import { useToggleAnnouncementLike } from '@/hooks/like/like';
import FilterContainer from '@/components/announcement/filterContainer';
import { useAnnouncementFilteringStore } from '@/zustands/filter/store';

const AnnouncementScreen = () => {
  const { filtering } = useAnnouncementFilteringStore();
  const { data: announcementList, refetch } = useGetAnnouncementLists();
  const { mutateAsync: announcementLike } = useToggleAnnouncementLike(refetch);

  const [filteringType, setFilteringType] = useState<string>('');

  const chipList = ['지역', '지원대상', '모집상태'];

  const handleFilteringType = (type: string) => {
    setFilteringType(type);
  };

  useEffect(() => {
    refetch();
    console.log(announcementList);
  }, [filtering, refetch]);

  return (
    <Suspense>
      <View className="flex-1">
        <StatusBar style="light" />

        <SafeAreaView className="flex-1 bg-black">
          <TopNavigation />
          <View className="flex-1 gap-y-4 bg-white">
            <SectionList
              sections={[{ title: 'chip', data: announcementList.content }]}
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
              bounces={false}
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
