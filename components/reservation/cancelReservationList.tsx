import { FlatList, Pressable, Text, View } from 'react-native';

import SmallGrayDownArrowIcon from '@/assets/icons/small-grayDownArrow.svg';
import { useGetReservationLists } from '@/hooks/reservation/reservation';

import SpaceSkeletonItem from '../spaceSkeleton';

import ReservationItem from './item/reservationItem';

export default function CancelReservationList() {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useGetReservationLists('CANCEL');

  const cancelReservationData =
    data?.pages.flatMap((page) => page.content.map((item) => ({ ...item }))) ?? [];

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="BODY1 text-red">잘못된 요청입니다!</Text>
      </View>
    );
  }

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
          : cancelReservationData
      }
      renderItem={({ item, index }) =>
        item ? (
          <ReservationItem key={item.reservationId} type={'CANCEL'} data={item} />
        ) : (
          <SpaceSkeletonItem key={index} />
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
      ItemSeparatorComponent={() => <View className="h-[16px]" />}
      ListEmptyComponent={() => (
        <View className="flex-1 flex justify-center items-center">
          <Text className="BODY1 text-deep_gray text-center">아직 예약 내역이 없어요</Text>
        </View>
      )}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
    />
  );
}
