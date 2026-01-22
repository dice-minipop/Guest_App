import { SvgProps } from 'react-native-svg';

import FemaleIcon from '@/assets/icons/filtering/female.svg';
import MaleIcon from '@/assets/icons/filtering/male.svg';

export type Items<T> = {
  title: string;
  value: T;
  icon?: (props: SvgProps) => React.ReactElement;
};

export const genderItems = [
  { title: '여성', value: 'female', icon: FemaleIcon },
  { title: '남성', value: 'male', icon: MaleIcon },
];

export const ageRangeItems: Items<string>[] = [
  { title: '10대이하', value: '10' },
  { title: '20대', value: '20' },
  { title: '30대', value: '30' },
  { title: '40대', value: '40' },
  { title: '50대', value: '50' },
  { title: '60대이상', value: '60' },
];

export const dayOfWeekItems = [
  { title: '월', value: 'monday' },
  { title: '화', value: 'tuesday' },
  { title: '수', value: 'wednesday' },
  { title: '목', value: 'thursday' },
  { title: '금', value: 'friday' },
  { title: '토', value: 'saturday' },
  { title: '일', value: 'sunday' },
];

export const purposeItems = [
  { title: '사진 촬영', value: 'snapshot' },
  { title: '쇼핑', value: 'shopping' },
  { title: '카페/맛집 탐방', value: 'tour' },
  { title: '전시 관람', value: 'exhibition' },
  { title: '데이트', value: 'date' },
];

export const sizeItems = [
  { title: '10평 이하', min: 0, max: 10 },
  { title: '10평대', min: 10, max: 20 },
  { title: '20평대', min: 20, max: 30 },
  { title: '30평대', min: 30, max: 40 },
  { title: '40평대', min: 40, max: 50 },
  { title: '50평대', min: 50, max: 60 },
  { title: '60평대', min: 60, max: 70 },
  { title: '70평대', min: 70, max: 80 },
  { title: '80평대', min: 80, max: 90 },
  { title: '90평대', min: 90, max: 100 },
  { title: '100평대', min: 100, max: 110 },
  { title: '110평대', min: 110, max: 120 },
  { title: '120평대', min: 120, max: 130 },
  { title: '130평대', min: 130, max: 140 },
  { title: '140평대', min: 140, max: 150 },
  { title: '150평대 이상', min: 150, max: 150 },
];

export const priceItems = [
  { title: '10만원 이하', min: 0, max: 100000 },
  { title: '10만원대', min: 100000, max: 200000 },
  { title: '20만원대', min: 200000, max: 300000 },
  { title: '30만원대', min: 300000, max: 400000 },
  { title: '40만원대', min: 400000, max: 500000 },
  { title: '50만원대', min: 500000, max: 600000 },
  { title: '60만원대', min: 600000, max: 700000 },
  { title: '70만원대', min: 700000, max: 800000 },
  { title: '80만원대', min: 800000, max: 900000 },
  { title: '90만원대', min: 900000, max: 1000000 },
  { title: '100만원대 이상', min: 1000000, max: 1000000 },
];

export const spaceSortByItems = [
  { title: '인기 순', value: 'likeCount' },
  { title: '최신 순', value: 'latest' },
  { title: '낮은 가격 순', value: 'priceAsc' },
  { title: '높은 가격 순', value: 'priceDesc' },
];

export const targetsItems = [
  { title: '전체', value: '전체' },
  { title: '자영업자', value: '자영업자' },
  { title: '소상공인', value: '소상공인' },
];

export const statusItems = [
  { title: '모집 중', value: 'RECRUITING' },
  { title: '모집 예정', value: 'COMPLETED' },
  { title: '모집 마감', value: 'CLOSED' },
];

export const announcementSoryByItems = [
  { title: '인기 순', value: 'likeCount' },
  { title: '최신 순', value: 'latest' },
  { title: '마감 순', value: 'closing' },
];
