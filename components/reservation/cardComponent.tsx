import React from 'react';
import { Pressable, View, Text, Image } from 'react-native';

import Icon from '../icon/icon';

interface CardComponentProps {
  type: string;
  reservationData: {
    id: number;
    date: string;
    name: string;
    address: string;
    capacity: number;
    imageUrl: string;
    period: string;
    price: number;
  };
}

const CardComponent: React.FC<CardComponentProps> = ({ type, reservationData }) => {
  return (
    <View className="gap-y-1">
      <Text className="text-CAP2 font-CAP2 leading-CAP2 text-light_gray self-end">
        {reservationData.date}
      </Text>
      <Pressable className="rounded-xl border border-stroke p-4 gap-y-4">
        <View className="gap-y-6">
          <View className="flex flex-row justify-between">
            <View className="pt-2">
              <Text className="text-CAP1 font-CAP1 lading-CAP1 text-medium_gray">
                {reservationData.address}
              </Text>
              <Text className="text-H2 font-H2 leading-H2">{reservationData.name}</Text>
            </View>

            <Image
              source={{ uri: reservationData.imageUrl }}
              className="w-[120px] h-[120px] rounded-xl"
            />
          </View>

          <View className="flex flex-col gap-y-1">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-semiLight_gray">
                대여 기간
              </Text>
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-deep_gray">
                {reservationData.period}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-CAP1 font-CAP1 leading-CAP1 text-semiLight_gray">
                총 대여 가격
              </Text>
              <Text
                className={`text-SUB1 font-SUB1 leading-SUB1 ${type === 'cancel' && 'line-through text-deep_gray'}`}
              >
                {reservationData.price.toLocaleString()}원
              </Text>
            </View>
          </View>
        </View>

        {type === 'waiting' && (
          <View className="flex flex-row gap-x-2">
            <Pressable className="p-3.5 rounded-lg border border-stroke">
              <Icon.FilledSend />
            </Pressable>
            <Pressable className="rounded-lg border border-stroke flex-1 flex items-center justify-center">
              <Text className="text-BTN1 font-BTN1 leading-BTN1 text-medium_gray text-center">
                대기 취소
              </Text>
            </Pressable>
            <Pressable className="rounded-lg border border-stroke flex-1 flex items-center justify-center">
              <Text className="text-BTN1 font-BTN1 leading-BTN1 text-medium_gray text-center">
                기간 변경
              </Text>
            </Pressable>
          </View>
        )}

        {type === 'complete' && (
          <View className="flex flex-row gap-x-2">
            <Pressable className="p-3.5 rounded-lg border border-stroke">
              <Icon.FilledSend />
            </Pressable>
            <Pressable className="rounded-lg border border-stroke flex-1 flex items-center justify-center">
              <Text className="text-BTN1 font-BTN1 leading-BTN1 text-medium_gray">예약 취소</Text>
            </Pressable>
          </View>
        )}

        {type === 'cancel' && (
          <View>
            <View className="rounded-lg bg-light_gray p-[15.5px]">
              <Text className="text-white text-BTN1 font-BTN1 leading-BTN1 text-center">
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
