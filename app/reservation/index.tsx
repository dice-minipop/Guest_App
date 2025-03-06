import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Pressable, SafeAreaView, Platform } from 'react-native';

import Icon from '@/components/icon/icon';
import { useReservationStore } from '@/zustands/reservation/store';
import { useSpaceDataStore } from '@/zustands/space/store';

const ReservationCompleteScreen = () => {
  const router = useRouter();

  const { spaceName } = useSpaceDataStore();
  const { reservationData } = useReservationStore();

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === 'android' && 'pt-[50px]'}`}>
      <StatusBar style="dark" />
      <View className="gap-y-12 px-5 pt-[120px]">
        <View className="flex flex-col items-center gap-y-10">
          <Icon.Check />
          <Text className="text-center font-H2 text-H2 leading-H2">
            예약이 완료되었습니다 :{')'}
          </Text>
        </View>

        <View className="flex flex-row justify-between rounded-lg bg-back_gray p-4">
          <View className="gap-y-1">
            <Text className="font-BODY1 text-BODY1 leading-BODY1 text-medium_gray">예약 공간</Text>
            <Text className="font-BODY1 text-BODY1 leading-BODY1 text-medium_gray">예약 번호</Text>
            <Text className="font-BODY1 text-BODY1 leading-BODY1 text-medium_gray">대여 기간</Text>
          </View>

          <View className="flex flex-col items-end gap-y-1">
            <Text className="font-BODY1 text-BODY1 leading-BODY1 text-dark_gray">{spaceName}</Text>
            <Text className="font-BODY1 text-BODY1 leading-BODY1 text-dark_gray">
              {reservationData.id}
            </Text>
            <Text className="font-BODY1 text-BODY1 leading-BODY1 text-dark_gray">
              {reservationData.startDate} ~ {reservationData.endDate}
            </Text>
          </View>
        </View>
      </View>

      <View
        className={`absolute bottom-0 flex flex-row gap-x-3 border-t border-t-stroke px-5 py-4 ${Platform.OS === 'ios' && 'pb-[34px]'}`}
      >
        <Pressable
          onPress={() => {
            router.dismissAll();
            router.push('/(tabs)/reservation');
          }}
          className="flex-1 rounded-lg border border-stroke bg-white px-4 py-[15.5px]"
        >
          <Text className="text-center font-BTN1 text-BTN1 leading-BTN1 text-black">
            예약 확인하기
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          className="flex-1 rounded-lg bg-black px-4 py-[15.5px]"
        >
          <Text className="text-center font-BTN1 text-BTN1 leading-BTN1 text-white">나가기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ReservationCompleteScreen;
