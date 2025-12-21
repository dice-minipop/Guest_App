import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import SmallGrayDownArrowIcon from '@/assets/icons/small-grayDownArrow.svg';
import { useGetReservationLists } from '@/hooks/reservation/reservation';

import OpacityPressable from '../common/opacityPressable';
import ReservationSkeletonItem from '../reservationSkeleton';

import ReservationItem from './item/reservationItem';
import SortBottomSheet from './sortBottomSheet';

export default function PendingReservationList() {
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest');
  const { data, isLoading, hasNextPage, fetchNextPage } = useGetReservationLists('PENDING', sort);

  const pendingReservationData =
    data?.pages.flatMap((page) => page.content.map((item) => ({ ...item }))) ?? [];

  const bottomSheetRef = useRef<BottomSheet>(null);

  const sortByItems = [
    { title: '최신순', value: 'latest' as const },
    { title: '오래된 순', value: 'oldest' as const },
  ];

  return (
    <>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 64,
          backgroundColor: '#FFFFFF',
        }}
        data={
          isLoading
            ? Array.from({ length: 3 }).map(() => null) // Skeleton용
            : pendingReservationData
        }
        renderItem={({ item, index }) =>
          item ? (
            <ReservationItem key={item.reservationId} type={'PENDING'} data={item} />
          ) : (
            <ReservationSkeletonItem key={index} />
          )
        }
        keyExtractor={(item, index) => (item ? `${item.reservationId}` : `skeleton-${index}`)}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <View className="bg-white px-[20px] py-[16px]">
            <OpacityPressable
              onPress={() => {
                bottomSheetRef.current?.expand();
              }}
              className="self-start flex flex-row items-center gap-x-[2px] pl-[12px] py-[5.5px] pr-[8px] border border-stroke rounded-full bg-back_gray"
            >
              <Text className="BTN1 text-deep_gray">
                {sortByItems.find((item) => item.value === sort)?.title}
              </Text>
              <SmallGrayDownArrowIcon />
            </OpacityPressable>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 flex justify-center items-center">
            <Text className="BODY1 text-deep_gray text-center">아직 예약 내역이 없어요</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-[16px]" />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />

      <SortBottomSheet
        bottomSheetRef={bottomSheetRef}
        sort={sort}
        handleSort={(sort: 'latest' | 'oldest') => {
          setSort(sort);
        }}
      />
    </>
  );
}
