import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { DateData } from 'react-native-calendars';
import { Portal } from 'react-native-portalize';

import Icon from '../icon/icon';

import CalendarListComponent from './calendarList';

interface DateModalComponentProps {
  isVisible: boolean;
  closeModal: () => void;
}

const DateModalComponent: React.FC<DateModalComponentProps> = ({ isVisible, closeModal }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleDate = (date: DateData) => {
    if (startDate !== '' && endDate !== '') {
      setEndDate('');
      setStartDate(date.dateString);
    } else if (startDate !== '') {
      setEndDate(date.dateString);
    } else {
      setStartDate(date.dateString);
    }
  };

  const clearDate = () => {
    setStartDate('');
    setEndDate('');
  };

  useEffect(() => {
    console.log('시작일: ', startDate);
    console.log('종료일: ', endDate);
  }, [startDate, endDate]);

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

            <Pressable className="flex-1 rounded-lg bg-black px-4 py-[15.5px]">
              <Text className="text-center font-BTN1 text-BTN1 text-white">예약하기</Text>
            </Pressable>
          </View>
        </View>
      </Portal>
    )
  );
};

export default DateModalComponent;
