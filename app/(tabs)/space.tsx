import { StatusBar } from 'expo-status-bar';
import React, { Suspense, useState } from 'react';
import { View, SectionList, SafeAreaView, Platform, Alert } from 'react-native';

import LoadingComponent from '@/components/common/loadingComponent';
import CardComponent from '@/components/space/card';
import ChipContainer from '@/components/space/chipContainer';
import FilterContainer from '@/components/space/filterContainer';
import HeaderComponent from '@/components/space/header';
import TopNavigation from '@/components/topNavigation/topNavigation';
import { useToggleSpaceLike } from '@/hooks/like/like';
import { useGetFilteredSpaceLists } from '@/hooks/space/space';
import { useSpaceFilteringStore } from '@/zustands/filter/store';
import { useGuestStateStore } from '@/zustands/member/store';

const SpaceScreen = () => {
  const { setIsRefetched, filtering } = useSpaceFilteringStore();
  const { isGuestMode } = useGuestStateStore();

  const {
    data: spaceList,
    fetchNextPage,
    hasNextPage,
    refetch,
    isPending,
  } = useGetFilteredSpaceLists(filtering);
  const { mutateAsync: spaceLike } = useToggleSpaceLike(refetch);

  const handleGuestMode = (id: number) => {
    if (isGuestMode) {
      Alert.alert('게스트로 둘러보기 상태에서는 이용할 수 없습니다!');
    } else {
      spaceLike(id);
    }
  };

  const chipList = ['지역', '가격', '수용인원', '정렬'];

  const [filteringType, setFilteringType] = useState<string>('');

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
              // section의 title과 데이터
              sections={[{ title: 'chip', data: spaceList.pages.flatMap((page) => page.content) }]}
              // 각 아이템의 key 값 지정
              keyExtractor={(item) => item.id.toString()}
              // 아이템들을 렌더링하는 메서드
              renderItem={({ item }) => (
                <View className="px-5">
                  <CardComponent spaceData={item} toggleLike={handleGuestMode} />
                </View>
              )}
              // sticky한 ChipContainer를 렌더링하기 위한 메서드
              renderSectionHeader={({ section }) =>
                section.title === 'chip' ? (
                  <ChipContainer chipList={chipList} openModal={handleFilteringType} />
                ) : null
              }
              // SectionList의 최상단에 렌더링되는 Header 아이템
              ListHeaderComponent={<HeaderComponent />}
              // FlatList의 최하단에 렌더링되는 Footer 아이템
              ListFooterComponent={<View className="h-16" />}
              // 렌더링 되는 아이템들 사이의 간격
              ItemSeparatorComponent={() => <View className="h-4" />}
              onEndReached={() => {
                if (hasNextPage) {
                  fetchNextPage();
                }
              }}
              // 양 끝에서 스크롤 방지
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

export default SpaceScreen;
