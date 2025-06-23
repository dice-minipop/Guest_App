import dayjs from 'dayjs';
import React from 'react';
import { Text, Pressable, View } from 'react-native';
import { DateData, LocaleConfig, CalendarList } from 'react-native-calendars';

import FilledPolygonIcon from '@/assets/icons/spaceDetail/filled-polygon.svg';
import PolygonIcon from '@/assets/icons/spaceDetail/polygon.svg';

LocaleConfig.locales['fr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

interface CalendarListComponentProps {
  startDate: string;
  endDate: string;
  handleDate: (date: DateData) => void;
  impossibleDateLists: {
    startDate: string;
    endDate: string;
  }[];
}

const CalendarListComponent: React.FC<CalendarListComponentProps> = ({
  startDate,
  endDate,
  handleDate,
  impossibleDateLists,
}) => {
  const today = dayjs().format('YYYY-MM-DD');

  return (
    <CalendarList
      pastScrollRange={0}
      futureScrollRange={12}
      onDayPress={handleDate}
      markingType="period"
      dayComponent={({ date, state }) => {
        const dateString = date?.dateString;

        const isPast = dayjs(dateString).isBefore(today, 'day');
        const isStartDate = dateString === startDate;
        const isEndDate = dateString === endDate;
        const isInPeriod = dateString > startDate && dateString < endDate;

        const isImpossibleDate = impossibleDateLists.some(
          ({ startDate, endDate }) => dateString >= startDate && dateString <= endDate,
        );

        return (
          <Pressable
            onPress={() => handleDate(date)}
            className={`relative h-12 w-full flex items-center justify-center ${isPast ? 'opacity-40' : ''} ${isInPeriod && 'bg-back_gray'}`}
            disabled={isPast}
          >
            {isStartDate && endDate && (
              <View className="absolute top-0 left-1/2 w-1/2 h-full bg-back_gray" />
            )}

            {isEndDate && <View className="absolute top-0 right-1/2 w-1/2 h-full bg-back_gray" />}

            {date?.dateString === startDate && (
              <View className="absolute top-[-2px]">
                <PolygonIcon />
              </View>
            )}
            {date?.dateString === endDate && (
              <View className="absolute top-[-2px]">
                <FilledPolygonIcon />
              </View>
            )}

            <Text
              className={`font-CAP1 text-CAP1 leading-CAP1 ${isImpossibleDate ? 'text-red' : ''}  ${
                isEndDate
                  ? 'text-white'
                  : isStartDate
                    ? 'text-black'
                    : isPast
                      ? 'text-light_gray'
                      : 'text-dark_gray'
              }`}
            >
              {date?.day}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

export default CalendarListComponent;
