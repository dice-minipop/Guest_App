import ChipContainer from '@/components/common/chipContainer';
import CardComponent from '@/components/reservation/cardComponent';
import HeaderComponent from '@/components/reservation/header';
import TopNavigation from '@/components/topNavigation/topNavigation';
import {
  cancelDummyData,
  completeDummyData,
  waitingDummyData,
} from '@/constants/mocks/reservationListDummyData';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, SectionList, View } from 'react-native';

const ReservationScreen = () => {
  const chipList = ['최신순'];

  const [filteringType, setFilteringType] = useState<string>('');

  const handleFilteringType = (type: string) => {
    setFilteringType(type);
  };

  const [status, setStatus] = useState<string>('waiting');

  const handleStatus = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 bg-black">
        <TopNavigation />

        <View className="flex-1 bg-white">
          {status === 'waiting' && (
            <SectionList
              // section의 title과 데이터
              sections={[{ title: 'chip', data: waitingDummyData }]}
              // 각 아이템의 key 값 지정
              keyExtractor={(item) => item.id.toString()}
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
                  size={waitingDummyData.length}
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

          {status === 'complete' && (
            <SectionList
              // section의 title과 데이터
              sections={[{ title: 'chip', data: completeDummyData }]}
              // 각 아이템의 key 값 지정
              keyExtractor={(item) => item.id.toString()}
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
                  size={waitingDummyData.length}
                />
              } // FlatList의 최하단에 렌더링되는 Footer 아이템
              ListFooterComponent={<View className="h-16" />}
              // 렌더링 되는 아이템들 사이의 간격
              ItemSeparatorComponent={() => <View className="h-4" />}
              // 양 끝에서 스크롤 방지
              bounces={false}
            />
          )}

          {status === 'cancel' && (
            <SectionList
              // section의 title과 데이터
              sections={[{ title: 'chip', data: cancelDummyData }]}
              // 각 아이템의 key 값 지정
              keyExtractor={(item) => item.id.toString()}
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
                  size={waitingDummyData.length}
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
  );
};

export default ReservationScreen;
