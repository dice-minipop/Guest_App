import { FlatList, Pressable, Text, View } from 'react-native';

import SmallGrayDownArrowIcon from '@/assets/icons/small-grayDownArrow.svg';
import { useGetReservationLists } from '@/hooks/reservation/reservation';

import ReservationSkeletonItem from '../reservationSkeleton';

import ReservationItem from './item/reservationItem';

export default function PendingReservationList() {
  const { data, isLoading, hasNextPage, fetchNextPage } = useGetReservationLists('PENDING');

  const pendingReservationData =
    data?.pages.flatMap((page) => page.content.map((item) => ({ ...item }))) ?? [];

  return (
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
          <Pressable className="self-start flex flex-row items-center gap-x-[2px] pl-[12px] py-[5.5px] pr-[8px] border border-stroke rounded-full bg-back_gray">
            <Text className="BTN1 text-deep_gray">최신순</Text>
            <SmallGrayDownArrowIcon />
          </Pressable>
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
  );
}
