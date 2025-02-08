import React from 'react';
import { Pressable, View, Text, Image } from 'react-native';

interface CardComponentProps {
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

const CardComponent: React.FC<CardComponentProps> = ({ reservationData }) => {
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
              <Text className="text-SUB1 font-SUB1 leading-SUB1">
                {reservationData.price.toLocaleString()}원
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text>ㅎㅇ</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CardComponent;
