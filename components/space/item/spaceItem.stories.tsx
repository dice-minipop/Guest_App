import type { Meta } from '@storybook/react-native';
import React from 'react';
import { ScrollView, Text } from 'react-native';

import SpaceItem from './spaceItem';

const meta: Meta<typeof SpaceItem> = {
  title: 'Space',
  component: SpaceItem,
};
export default meta;

globalThis.__STORYBOOK__ = true;

const likeSpaceItem = {
  id: 20,
  name: '셀렉티드닉스 강남역점',
  address: '서울특별시 강남구 테헤란로4길',
  city: '서울특별시',
  district: '강남구',
  imageUrl:
    'https://cmc-dice-bucket.s3.ap-northeast-2.amazonaws.com/34/35ae787e-f56b-4bb2-9d4b-31c454e0c5d7.jpg',
  pricePerDay: 150000,
  discountRate: 5,
  discountPrice: 142500,
  capacity: 40,
  size: 150,
  likeCount: 1,
  isLiked: true,
  isActivated: true,
};

const unLikeSpaceItem = {
  id: 20,
  name: '셀렉티드닉스 강남역점',
  address: '서울특별시 강남구 테헤란로4길',
  city: '서울특별시',
  district: '강남구',
  imageUrl:
    'https://cmc-dice-bucket.s3.ap-northeast-2.amazonaws.com/34/35ae787e-f56b-4bb2-9d4b-31c454e0c5d7.jpg',
  pricePerDay: 150000,
  discountRate: 5,
  discountPrice: 142500,
  capacity: 40,
  size: 150,
  likeCount: 1,
  isLiked: false,
  isActivated: true,
};

export const SpaceItems = () => (
  <ScrollView contentContainerStyle={{ flexDirection: 'column', rowGap: 16, paddingBottom: 80 }}>
    <Text className="mx-[20px] H2">공간 아이템 좋아요 여부 별 Story</Text>

    <SpaceItem data={likeSpaceItem} />
    <SpaceItem data={unLikeSpaceItem} />
  </ScrollView>
);
