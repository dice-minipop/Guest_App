import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Alert } from 'react-native';
import { DateData } from 'react-native-calendars';
import { Portal } from 'react-native-portalize';

import {
  useCreateReservation,
  useGetImpossibleDateLists,
  useGetReservationLists,
} from '@/hooks/reservation/reservation';

import Icon from '../icon/icon';

import CalendarListComponent from './calendarList';

interface DateModalComponentProps {
  isVisible: boolean;
  spaceId: number;
  closeModal: () => void;
}

const DateModalComponent: React.FC<DateModalComponentProps> = ({
  isVisible,
  spaceId,
  closeModal,
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const { refetch } = useGetReservationLists();
  const { mutateAsync: createReservation } = useCreateReservation(refetch);

  const { data } = useGetImpossibleDateLists(spaceId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${year}.${month}.${day}`;
  };

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
      closeModal();
      createReservation({
        spaceId,
        startDate,
        endDate,
        message: '',
      });
    } else if (startDate === '' && endDate === '') {
      Alert.alert('예약할 날짜를 선택해주세요!');
    } else if (startDate !== '' && endDate === '') {
      Alert.alert('종료일을 선택해주세요!');
    }
  };

  console.log(data);

  return (
    isVisible && (
      <Portal>
        <View
          onTouchEnd={closeModal}
          className="relative flex h-screen w-screen justify-end bg-black/50"
        >
          <View
            onTouchEnd={(e) => e.stopPropagation()}
            className="h-[740px] rounded-t-xl bg-white pt-6"
          >
            <View className="flex flex-row items-center justify-between pl-5 pr-[3px]">
              <Text className="font-H2 text-H2 leading-H2">예약 일정 선택</Text>

              <Pressable onPress={closeModal} className="p-3">
                <Icon.X />
              </Pressable>
            </View>

            <View className="mx-5 h-[1px] bg-stroke" />

            <CalendarListComponent
              startDate={startDate}
              endDate={endDate}
              handleDate={handleDate}
              impossibleDateLists={data.reservedDates}
            />
          </View>

          <View
            onTouchEnd={(e) => e.stopPropagation()}
            className="absolute flex-row items-center gap-x-3 bg-white px-5 pb-[50px] pt-4"
          >
            <Pressable
              onPress={clearDate}
              className="rounded-lg border border-stroke px-4 py-[15.5px]"
            >
              <Text className="text-center font-BTN1 text-BTN1 text-black">날짜 초기화</Text>
            </Pressable>

            <Pressable
              onPress={handleReservation}
              className="flex-1 rounded-lg bg-black px-4 py-[15.5px]"
            >
              <Text className="text-center font-BTN1 text-BTN1 text-white">
                {startDate !== '' && endDate !== ''
                  ? `${formatDate(startDate)}~${formatDate(endDate)} / 예약하기`
                  : '예약하기'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Portal>
    )
  );
};

export default DateModalComponent;
