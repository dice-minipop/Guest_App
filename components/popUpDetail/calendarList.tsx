import React from 'react';
import dayjs from 'dayjs';
import { Text, Pressable, View } from 'react-native';
import { DateData, LocaleConfig, CalendarList } from 'react-native-calendars';

import Icon from '../icon/icon';

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
}

const CalendarListComponent: React.FC<CalendarListComponentProps> = ({
  startDate,
  endDate,
  handleDate,
}) => {
  const today = dayjs().format('YYYY-MM-DD');

  return (
    <CalendarList
      pastScrollRange={0}
      futureScrollRange={12}
      onDayPress={handleDate}
      markingType="period"
      dayComponent={({ date, state }) => {
        const isPast = date && dayjs(date.dateString).isBefore(today, 'day');
        const isStartDate = date?.dateString === startDate;
        const isEndDate = date?.dateString === endDate;

        const isInPeroid = date?.dateString < endDate && date?.dateString > startDate;

        return (
          <Pressable
            onPress={() => handleDate(date)}
            className={`relative px-1 py-3.5 ${isPast ? 'opacity-40' : ''} ${
              isInPeroid && 'bg-back_gray'
            }`}
            disabled={isPast}
          >
            {date?.dateString === startDate && (
              <View className="absolute left-0 top-0">
                <Icon.Polygon />
              </View>
            )}
            {date?.dateString === endDate && (
              <View className="absolute left-0 top-0">
                <Icon.FilledPolygon />
              </View>
            )}

            <Text
              className={`w-10 text-center font-CAP1 text-CAP1 leading-CAP1 ${
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
