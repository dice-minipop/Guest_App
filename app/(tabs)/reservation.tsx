import { StatusBar } from 'expo-status-bar';
import React, { Suspense, useState } from 'react';
import { Platform, SafeAreaView, SectionList, View } from 'react-native';

import CardComponent from '@/components/reservation/cardComponent';
import HeaderComponent from '@/components/reservation/header';
import ChipContainer from '@/components/space/chipContainer';
import TopNavigation from '@/components/topNavigation/topNavigation';
import { useGetReservationLists } from '@/hooks/reservation/reservation';

const ReservationScreen = () => {
  const chipList = ['최신순'];

  const [filteringType, setFilteringType] = useState<string>('');

  const handleFilteringType = (type: string) => {
    setFilteringType(type);
  };

  // PENDING, ACCEPT, DECLINE, CANCEL
  const [status, setStatus] = useState<string>('PENDING');

  const handleStatus = (newStatus: string) => {
    setStatus(newStatus);
  };

  const { data } = useGetReservationLists(status);

  return (
    <Suspense>
      <View className="flex-1">
        <StatusBar style="light" />
        <SafeAreaView className={`flex-1 bg-black ${Platform.OS === 'android' && 'pt-[50px]'}`}>
          <TopNavigation />

          <View className="flex-1 bg-white">
            {status === 'PENDING' && (
              <SectionList
                // section의 title과 데이터
                sections={[{ title: 'chip', data: data.pages.flatMap((page) => page.content) }]}
                // 각 아이템의 key 값 지정
                keyExtractor={(item) => item.reservationId.toString()}
                // 아이템들을 렌더링하는 메서드
                renderItem={({ item }) => (
                  <View className="px-5">
                    <CardComponent reservationData={item} type={status} />
                  </View>
                )}
                // sticky한 ChipContainer를 렌더링하기 위한 메서드
                renderSectionHeader={({ section }) =>
                  section.title === 'chip' ? (
                    <ChipContainer chipList={chipList} openModal={handleFilteringType} />
                  ) : null
                }
                // SectionList의 최상단에 렌더링되는 Header 아이템
                ListHeaderComponent={
                  <HeaderComponent
                    status={status}
                    handleStatus={handleStatus}
                    // size={data.length}
                  />
                }
                // FlatList의 최하단에 렌더링되는 Footer 아이템
                ListFooterComponent={<View className="h-16" />}
                // 렌더링 되는 아이템들 사이의 간격
                ItemSeparatorComponent={() => <View className="h-4" />}
                // 양 끝에서 스크롤 방지
                bounces={false}
              />
            )}

            {status === 'ACCEPT' && (
              <SectionList
                // section의 title과 데이터
                sections={[{ title: 'chip', data: data.pages.flatMap((page) => page.content) }]}
                // 각 아이템의 key 값 지정
                keyExtractor={(item) => item.reservationId.toString()}
                // 아이템들을 렌더링하는 메서드
                renderItem={({ item }) => (
                  <View className="px-5">
                    <CardComponent reservationData={item} type={status} />
                  </View>
                )}
                // sticky한 ChipContainer를 렌더링하기 위한 메서드
                renderSectionHeader={({ section }) =>
                  section.title === 'chip' ? (
                    <ChipContainer chipList={chipList} openModal={handleFilteringType} />
                  ) : null
                }
                // SectionList의 최상단에 렌더링되는 Header 아이템
                ListHeaderComponent={
                  <HeaderComponent
                    status={status}
                    handleStatus={handleStatus}
                    // size={waitingDummyData.length}
                  />
                } // FlatList의 최하단에 렌더링되는 Footer 아이템
                ListFooterComponent={<View className="h-16" />}
                // 렌더링 되는 아이템들 사이의 간격
                ItemSeparatorComponent={() => <View className="h-4" />}
                // 양 끝에서 스크롤 방지
                bounces={false}
              />
            )}

            {status === 'CANCEL' && (
              <SectionList
                // section의 title과 데이터
                sections={[{ title: 'chip', data: data.pages.flatMap((page) => page.content) }]}
                // 각 아이템의 key 값 지정
                keyExtractor={(item) => item.reservationId.toString()}
                // 아이템들을 렌더링하는 메서드
                renderItem={({ item }) => (
                  <View className="px-5">
                    <CardComponent reservationData={item} type={status} />
                  </View>
                )}
                // sticky한 ChipContainer를 렌더링하기 위한 메서드
                renderSectionHeader={({ section }) =>
                  section.title === 'chip' ? (
                    <ChipContainer chipList={chipList} openModal={handleFilteringType} />
                  ) : null
                }
                // SectionList의 최상단에 렌더링되는 Header 아이템
                ListHeaderComponent={
                  <HeaderComponent
                    status={status}
                    handleStatus={handleStatus}
                    // size={waitingDummyData.length}
                  />
                } // FlatList의 최하단에 렌더링되는 Footer 아이템
                ListFooterComponent={<View className="h-16" />}
                // 렌더링 되는 아이템들 사이의 간격
                ItemSeparatorComponent={() => <View className="h-4" />}
                // 양 끝에서 스크롤 방지
                bounces={false}
              />
            )}

            <View className="h-16" />
          </View>
        </SafeAreaView>
      </View>
    </Suspense>
  );
};

export default ReservationScreen;
