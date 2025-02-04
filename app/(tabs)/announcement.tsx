import React, { useState } from 'react';
import { View, SectionList, SafeAreaView } from 'react-native';

import TopNavigation from '@/components/topNavigation/topNavigation';
import ChipContainer from '@/components/common/chipContainer';
import FilterContainer from '@/components/common/filterContainer';
import AnnouncementItemComponent from '@/components/announcement/announcementItem';
import AnnouncementHeaderComponent from '@/components/announcement/announcementHeader';
import { AnnouncementItem } from '@/types/announcement';
import { recruitItemDummy } from '@/constants/mocks/announcementDummyData';
import { StatusBar } from 'expo-status-bar';

const RecruitScreen = () => {
  const [recruitItem, setRecruitItem] = useState<AnnouncementItem[]>(recruitItemDummy);
  const [filteringType, setFilteringType] = useState<string>('');

  const chipList = ['지역', '지원대상', '모집상태'];

  const handleFilteringType = (type: string) => {
    setFilteringType(type);
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1 bg-black">
        <TopNavigation />
        <View className="flex-1 gap-y-4 bg-white">
          <SectionList
            sections={[{ title: 'chip', data: recruitItem }]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="px-5">
                <AnnouncementItemComponent recruitItem={item} />
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
  );
};

export default RecruitScreen;
