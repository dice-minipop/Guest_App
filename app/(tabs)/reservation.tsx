import { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, RefreshControl, Text, View } from 'react-native';

import CoverViewComponent from '@/components/common/coverView';
import ReservationItemComponent from '@/components/common/reservationItem';
import HeaderComponent from '@/components/reservation/header';
import TopNavigationComponent from '@/components/tabs/topNavigation';
import { reservationData } from '@/constants/dummyData/reservationList';
import { useGetReservationLists } from '@/hooks/reservation/reservation';
// import { ReservationItem } from '@/types/reservation';

export default function Reservation() {
  const [currentType, setCurrentType] = useState<'PENDING' | 'ACCEPT' | 'CANCEL'>('PENDING');

  // const { data, hasNextPage, fetchNextPage, refetch } = useGetReservationLists(currentType);
  const data = reservationData;

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    // refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View className="flex-1 bg-white">
      <TopNavigationComponent title="예약 관리" />
      <CoverViewComponent height={500} top={-100} />

      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 64,
          backgroundColor: '#FFFFFF',
          rowGap: 16,
        }}
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
        // data={data?.pages.flatMap((page) => page.content)}
        data={data}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <HeaderComponent currentType={currentType} setCurrentType={setCurrentType} />
        }
        renderItem={({ item }) => (
          <ReservationItemComponent key={item.reservationId} type={currentType} data={item} />
        )}
        ItemSeparatorComponent={() => <View className="h-[16px]" />}
        ListEmptyComponent={() => (
          <View className="flex-1 flex justify-center items-center">
            <Text className="BODY1 text-deep_gray text-center">아직 예약 내역이 없어요</Text>
          </View>
        )}
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
