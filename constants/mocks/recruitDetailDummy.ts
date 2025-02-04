import { AnnouncementDetailItem } from '@/types/announcement';

export const recruitDetailDummy: AnnouncementDetailItem[] = [
  {
    imageList: [
      'https://placehold.co/600x400/png',
      'https://placehold.co/600x400/png',
      'https://placehold.co/600x400/png',
      'https://placehold.co/600x400/png',
      'https://placehold.co/600x400/png',
      'https://placehold.co/600x400/png',
    ],
    title: '지원 공고 제목',
    isLiked: true,
    likeCount: 56,
    location: '서울',
    locationDetail:
      '성수 산업문화 복합테마공간 내 씨어터 SS [지하철 2호선 성수역 2층 內 4번 출구 방면]',
    target: ['소상공인', '중소기업'],
    startDate: '25.01.01',
    endDate: '26.01.01',
    information:
      '중소기업소상공인의 판로 지원를 위해 성수역 산업문화 복합테마공간 내 팝업스토어에 참여할 관내 업체를 다음과 같이 모집 공고합니다.',
  },
];
