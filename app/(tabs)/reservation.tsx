import ChipContainer from '@/components/common/chipContainer';
import CardComponent from '@/components/reservation/cardComponent';
import TopNavigation from '@/components/topNavigation/topNavigation';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Pressable, SafeAreaView, SectionList, Text, View } from 'react-native';

const ReservationScreen = () => {
  const data = [
    {
      id: 1,
      date: '0000.0.0.',
      name: '팝업스토어 제목',
      address: '서울시 강남구',
      capacity: 10,
      imageUrl: 'https://placehold.co/600x400/png',

      period: '25.3.1~25.3.31 (31일)',
      price: 1550000,
    },
    {
      id: 2,
      date: '0000.0.0.',
      name: '팝업스토어 제목',
      address: '서울시 강남구',
      capacity: 10,
      imageUrl: 'https://placehold.co/600x400/png',

      period: '25.3.1~25.3.31 (31일)',
      price: 1550000,
    },
    {
      id: 3,
      date: '0000.0.0.',
      name: '팝업스토어 제목',
      address: '서울시 강남구',
      capacity: 10,
      imageUrl: 'https://placehold.co/600x400/png',

      period: '25.3.1~25.3.31 (31일)',
      price: 1550000,
    },
  ];

  const chipList = ['최신순'];

  const [filteringType, setFilteringType] = useState<string>('');

  const handleFilteringType = (type: string) => {
    setFilteringType(type);
  };

  const [status, setStatus] = useState<string>('waiting');

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 bg-black">
        <TopNavigation />

        <View className="bg-back_gray flex flex-row items-center justify-center px-5">
          <Pressable onPress={() => setStatus('waiting')} className="py-3">
            <Text
              className={`text-SUB3 font-SUB3 leading-SUB3 ${status === 'waiting' ? 'text-black' : 'text-medium_gray'}`}
            >
              대기중
            </Text>
          </Pressable>
          <Pressable onPress={() => setStatus('complete')} className="py-3">
            <Text
              className={`text-SUB3 font-SUB3 leading-SUB3 ${status === 'complete' ? 'text-black' : 'text-medium_gray'}`}
            >
              예약 완료
            </Text>
          </Pressable>
          <Pressable onPress={() => setStatus('cancel')} className="py-3">
            <Text
              className={`text-SUB3 font-SUB3 leading-SUB3 ${status === 'cancel' ? 'text-black' : 'text-medium_gray'}`}
            >
              예약 취소
            </Text>
          </Pressable>
        </View>

        <View className="flex-1 bg-white">
          <SectionList
            // section의 title과 데이터
            sections={[{ title: 'chip', data: data }]}
            // 각 아이템의 key 값 지정
            keyExtractor={(item) => item.id.toString()}
            // 아이템들을 렌더링하는 메서드
            renderItem={({ item }) => (
              <View className="px-5">
                <CardComponent reservationData={item} />
              </View>
            )}
            // sticky한 ChipContainer를 렌더링하기 위한 메서드
            renderSectionHeader={({ section }) =>
              section.title === 'chip' ? (
                <ChipContainer chipList={chipList} openModal={handleFilteringType} />
              ) : null
            }
            // SectionList의 최상단에 렌더링되는 Header 아이템
            // ListHeaderComponent={<HeaderComponent />}
            // FlatList의 최하단에 렌더링되는 Footer 아이템
            ListFooterComponent={<View className="h-16" />}
            // 렌더링 되는 아이템들 사이의 간격
            ItemSeparatorComponent={() => <View className="h-4" />}
            // 양 끝에서 스크롤 방지
            bounces={false}
          />
          <View className="h-16" />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ReservationScreen;
