import type { Meta } from '@storybook/react-native';
import React from 'react';
import { ScrollView, Text } from 'react-native';

import AnnouncementItemComponent from './announcementItem';

const meta: Meta<typeof AnnouncementItemComponent> = {
  title: 'Announcement',
  component: AnnouncementItemComponent,
};
export default meta;

globalThis.__STORYBOOK__ = true;

const likeAnnouncementItem = {
  id: 1,
  title: '지원 공고 제목1지원',
  city: '서울시',
  district: '중랑구',
  hostName: '공고',
  target: '소상공인, 자영업자',
  recruitmentStartAt: '2025-06-12T23:12:00+09:00',
  recruitmentEndAt: '2025-06-12T23:12:00+09:00',
  likeCount: 153,
  isLiked: true,
  status: '모집 중',
};

const unLikeAnnouncementItem = {
  id: 1,
  title:
    '지원 공고 제목1지원 공고 제목1지원 공고 제목1지원 공고 제목1지원 공고 제목1지원 공고 제목1',
  city: '서울시',
  district: '중랑구',
  hostName: '공고',
  target: '소상공인, 자영업자',
  recruitmentStartAt: '2025-06-12T23:12:00+09:00',
  recruitmentEndAt: '2025-06-12T23:12:00+09:00',
  likeCount: 153,
  isLiked: false,
  status: '모집 중',
};

export const AnnouncementItems = () => (
  <ScrollView contentContainerStyle={{ flexDirection: 'column', rowGap: 16, paddingBottom: 80 }}>
    <Text className="mx-[20px] H2">공고 아이템 좋아요 여부 별 Story</Text>

    <AnnouncementItemComponent data={likeAnnouncementItem} />
    <AnnouncementItemComponent data={unLikeAnnouncementItem} />
  </ScrollView>
);
