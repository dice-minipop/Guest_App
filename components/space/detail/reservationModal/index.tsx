import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { DateData } from 'react-native-calendars';

import XIcon from '@/assets/icons/spaceDetail/x.svg';
import { useGetImpossibleDateLists, useCreateReservation } from '@/hooks/reservation/reservation';
import { formatDate } from '@/utils/translateDate';

import CalendarListComponent from './calendarList';

interface ReservationModalComponentProps {
  spaceId: number;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  onRoute: any;
}

const ReservationModalComponent: React.FC<ReservationModalComponentProps> = ({
  spaceId,
  bottomSheetRef,
  onRoute,
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  //   const { data } = useGetImpossibleDateLists(spaceId);
  const data = { reservedDates: [{ startDate: '2025-06-20', endDate: '2025-06-21' }] };

  const { mutateAsync: createReservation } = useCreateReservation();

  const handleDate = (date: DateData) => {
    const selectedDate = date.dateString;

    const isReserved = data.reservedDates.some(
      ({ startDate, endDate }) => selectedDate >= startDate && selectedDate <= endDate,
    );

    if (isReserved) {
      Alert.alert('해당 날짜는 선택할 수 없습니다!');
      return;
    }

    // 시작일과 종료일이 이미 선택된 경우 -> 새로 선택 시작
    if (startDate !== '' && endDate !== '') {
      setStartDate(selectedDate);
      setEndDate('');
      return;
    }

    // 시작일 선택됨, 종료일 선택 안됨
    if (startDate !== '' && endDate === '') {
      if (selectedDate === startDate) {
        return; // 같은 날짜 선택 방지
      } else if (selectedDate < startDate) {
        setStartDate(selectedDate); // 이전 날짜로 시작일 변경
      } else {
        // 선택한 종료일(startDate ~ selectedDate) 범위 내 예약된 날짜가 있는지 확인
        const hasReservedBetween = data.reservedDates.some(
          ({ startDate: resStart, endDate: resEnd }) =>
            (resStart >= startDate && resStart <= selectedDate) ||
            (resEnd >= startDate && resEnd <= selectedDate),
        );

        if (hasReservedBetween) {
          Alert.alert('해당 범위 내 예약된 날짜가 포함되어 있어 선택할 수 없습니다!');
          return;
        }

        setEndDate(selectedDate);
      }
    } else if (startDate === '' && endDate === '') {
      setStartDate(selectedDate);
    }
  };

  const clearDate = () => {
    setStartDate('');
    setEndDate('');
  };

  const handleReservation = () => {
    if (startDate !== '' && endDate !== '') {
      bottomSheetRef.current?.close();
      onRoute();
      //   createReservation({
      //     spaceId,
      //     startDate,
      //     endDate,
      //     message: '',
      //   });
    } else if (startDate === '' && endDate === '') {
      Alert.alert('예약할 날짜를 선택해주세요!');
    } else if (startDate !== '' && endDate === '') {
      Alert.alert('종료일을 선택해주세요!');
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[700]}
      maxDynamicContentSize={700}
      index={-1}
      enablePanDownToClose={true}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} opacity={0.7} disappearsOnIndex={-1} appearsOnIndex={0} />
      )}
    >
      <BottomSheetView className="flex-1">
        <View className="flex flex-row items-center justify-between pl-[20px] pr-[3px]">
          <Text className="H2 text-black py-[8.5px]">예약 일정 선택</Text>

          <Pressable onPress={() => bottomSheetRef.current?.close()} className="p-[12px]">
            <XIcon />
          </Pressable>
        </View>

        <View className="h-[1px] bg-stroke mx-[20px]" />

        <View className="h-[600px] pb-[64px]">
          <CalendarListComponent
            startDate={startDate}
            endDate={endDate}
            handleDate={handleDate}
            impossibleDateLists={data.reservedDates}
          />
        </View>

        <View className="absolute bottom-0 bg-white flex flex-row items-center gap-x-[12px] py-[16px] w-full px-[20px] border-t border-t-stroke">
          <Pressable
            onPress={clearDate}
            className="rounded-lg border border-stroke px-4 py-[15.5px]"
          >
            <Text className="BTN1 text-black text-center">날짜 초기화</Text>
          </Pressable>

          <Pressable
            onPress={handleReservation}
            className="flex-1 rounded-lg bg-black px-4 py-[15.5px]"
          >
            <Text className="BTN1 text-white text-center">
              {startDate !== '' && endDate !== ''
                ? `${formatDate(startDate)}~${formatDate(endDate)} / 예약하기`
                : '예약하기'}
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ReservationModalComponent;
