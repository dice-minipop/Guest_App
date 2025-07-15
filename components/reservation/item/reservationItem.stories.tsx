import type { Meta } from '@storybook/react-native';
import React from 'react';
import { ScrollView, Text } from 'react-native';

import ReservationItem from './reservationItem';

const meta: Meta<typeof ReservationItem> = {
  title: 'Reservation',
  component: ReservationItem,
};
export default meta;

globalThis.__STORYBOOK__ = true;

const reservationItem = {
  reservationId: 33,
  spaceName: '힐링 카페힐링 카페힐링 카페힐링 카페힐링 카페',
  startDate: '2025-04-10',
  endDate: '2025-04-12',
  message: '',
  status: 'PENDING',
  city: '서울특별시',
  district: '서초구',
  capacity: 15,
  size: 40,
  totalPrice: 22800,
  spaceImage:
    'https://cmc-dice-bucket.s3.ap-northeast-2.amazonaws.com/34/98c23dfe-f664-4ec2-9e6f-5ef1d948ca57.jpg',
};

export const ReservationItems = () => (
  <ScrollView contentContainerStyle={{ flexDirection: 'column', rowGap: 16, paddingBottom: 80 }}>
    <Text className="mx-[20px] H2">예약 공간 아이템 상태 별 Story</Text>

    <ReservationItem type="PENDING" data={reservationItem} />
    <ReservationItem type="ACCEPT" data={reservationItem} />
    <ReservationItem type="CANCEL" data={reservationItem} />
  </ScrollView>
);
