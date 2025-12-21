import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { DateData } from 'react-native-calendars';

import XIcon from '@/assets/icons/spaceDetail/x.svg';
import OpacityPressable from '@/components/common/opacityPressable';
import { useGetImpossibleDateLists } from '@/hooks/reservation/reservation';
import { SpaceDetailComponentProps } from '@/types/space';
import { formatDate } from '@/utils/translateDate';
import { useCreateReservationStore } from '@/zustands/reservation/store';

import CalendarListComponent from './calendarList';

interface ReservationModalComponentProps extends SpaceDetailComponentProps {
  spaceId: number;
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
}

export default function ReservationModalComponent({
  spaceId,
  data,
  bottomSheetRef,
}: ReservationModalComponentProps) {
  const router = useRouter();

  const { setReservationData } = useCreateReservationStore();

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const { data: dateLists } = useGetImpossibleDateLists(spaceId);

  const handleDate = (date: DateData) => {
    const selectedDate = date.dateString;

    const isReserved = dateLists.reservedDates.some(
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
        const hasReservedBetween = dateLists.reservedDates.some(
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
      setReservationData('spaceId', spaceId);
      setReservationData('startDate', startDate);
      setReservationData('endDate', endDate);

      bottomSheetRef.current?.close();
      router.push('/space/reservation/checkProfile');
    } else if (startDate === '' && endDate === '') {
      Alert.alert('예약할 날짜를 선택해주세요!');
    } else if (startDate !== '' && endDate === '') {
      Alert.alert('종료일을 선택해주세요!');
    }
  };

  const getTotalDays = (start: string, end: string) => {
    if (!start || !end) return 0;

    const startD = new Date(start);
    const endD = new Date(end);

    // 날짜 차이 계산 (밀리초 단위)
    const diffTime = endD.getTime() - startD.getTime();

    // 밀리초 -> 일수 변환 + 1
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays;
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
      <BottomSheetView className="h-[700px]">
        <View className="h-[700px]">
          <View className="flex flex-row items-center justify-between pl-[20px] pr-[3px]">
            <Text className="H2 text-black py-[8.5px]">예약 일정 선택</Text>

            <OpacityPressable onPress={() => bottomSheetRef.current?.close()}>
              <View className="p-[12px]">
                <XIcon />
              </View>
            </OpacityPressable>
          </View>

          <View className="h-[1px] bg-stroke mx-[20px]" />

          <View className="flex-1 pb-[64px]">
            <CalendarListComponent
              startDate={startDate}
              endDate={endDate}
              handleDate={handleDate}
              impossibleDateLists={dateLists.reservedDates}
            />
          </View>

          <View className="bg-white">
            {startDate !== '' && endDate !== '' && (
              <View className="bg-purple p-[20px]">
                <Text className="SUB1 text-white text-center">
                  {formatDate(startDate)} ~ {formatDate(endDate)} /{' '}
                  {(getTotalDays(startDate, endDate) * data.discountPrice).toLocaleString()}원
                </Text>
              </View>
            )}

            <View className="flex flex-row gap-x-[8px] px-[20px] pt-[16px] pb-[56px]">
              <OpacityPressable
                onPress={clearDate}
                className="rounded-lg border border-stroke px-4 py-[15.5px]"
              >
                <Text className="BTN1 text-black text-center">날짜 초기화</Text>
              </OpacityPressable>

              <OpacityPressable
                onPress={handleReservation}
                disabled={startDate === '' && endDate === ''}
                className={`flex-1 rounded-lg ${startDate !== '' && endDate !== '' ? 'bg-black' : 'bg-light_gray'} px-[16px] py-[15.5px]`}
              >
                <Text className="BTN1 text-white text-center">예약 신청</Text>
              </OpacityPressable>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
