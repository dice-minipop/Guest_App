import React from 'react';
import { Pressable, View, Text, Image, Alert } from 'react-native';

import { useCancelReservation, useGetReservationLists } from '@/hooks/reservation/reservation';
import { ReservationItem } from '@/server/reservation/response';

import Icon from '../icon/icon';

interface CardComponentProps {
  type: string;
  reservationData: ReservationItem;
}

const CardComponent: React.FC<CardComponentProps> = ({ type, reservationData }) => {
  const { refetch } = useGetReservationLists(type);
  const { mutateAsync: cancelReservation } = useCancelReservation(refetch);

  const handleCancel = () => {
    Alert.alert('예약을 취소하시겠습니까?', '예약 취소 시 복구할 수 없습니다.', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => cancelReservation(reservationData.reservationId),
      },
    ]);
  };

  return (
    <View className="gap-y-1">
      {/* <Text className="text-CAP2 font-CAP2 leading-CAP2 text-light_gray self-end">
        {reservationData.date}
      </Text> */}
      <Pressable className="rounded-xl border border-stroke p-4 gap-y-4">
        <View className="gap-y-6">
          <View className="flex flex-row justify-between">
            <View className="pt-2">
              <Text className="text-CAP1 font-CAP1 lading-CAP1 text-medium_gray">
                {reservationData.city} · {reservationData.district}
              </Text>
              <Text className="text-H2 font-H2 leading-H2">{reservationData.spaceName}</Text>

              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-light_gray">
                {reservationData.size}m² · {reservationData.capacity}명 수용 가능
              </Text>
            </View>

            <Image
              source={{ uri: reservationData.spaceImage }}
              className="w-[120px] h-[120px] rounded-xl"
            />
          </View>

          <View className="flex flex-col gap-y-1">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-semiLight_gray">
                대여 기간
              </Text>
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-deep_gray">
                {reservationData.startDate}~{reservationData.endDate}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-semiLight_gray">
                총 대여 가격
              </Text>
              <Text
                className={`text-SUB1 font-SUB1 leading-SUB1 ${type === 'CANCEL' && 'line-through text-deep_gray'}`}
              >
                {reservationData.totalPrice.toLocaleString()}원
              </Text>
            </View>
          </View>
        </View>

        {type === 'PENDING' && (
          <View className="flex flex-row gap-x-2">
            {/* <Pressable className="p-3.5 rounded-lg border border-stroke">
              <Icon.FilledSend />
            </Pressable> */}
            <Pressable
              onPress={handleCancel}
              className="rounded-lg border border-stroke flex-1 flex items-center justify-center py-[15.5px]"
            >
              <Text className="text-BTN1 font-BTN1 leading-BTN1 text-medium_gray text-center">
                대기 취소
              </Text>
            </Pressable>
          </View>
        )}

        {type === 'ACCEPT' && (
          <View className="flex flex-row gap-x-2">
            {/* <Pressable className="p-3.5 rounded-lg border border-stroke">
              <Icon.FilledSend />
            </Pressable> */}
            <Pressable
              onPress={handleCancel}
              className="rounded-lg border border-stroke flex-1 flex items-center justify-center py-[15.5px]"
            >
              <Text className="text-BTN1 font-BTN1 leading-BTN1 text-medium_gray">예약 취소</Text>
            </Pressable>
          </View>
        )}

        {type === 'CANCEL' && (
          <View>
            <View className="rounded-lg bg-light_gray border border-light_gray">
              <Text className="text-white text-BTN1 font-BTN1 leading-BTN1 text-center py-[15.5px]">
                예약 취소됨
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default CardComponent;
