import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import FloatingBackHeader from '@/components/common/floatingBackHeader';
import SpaceBasicInfoComponent from '@/components/space/detail/basicInfo';
import SpaceBasicInfoSkeleton from '@/components/space/detail/basicInfoSkeleton';
import BottomButtonContainer from '@/components/space/detail/bottomButtonContainer';
import SpaceFacilityInfoComponent from '@/components/space/detail/facilityInfo';
import SpaceFacilityInfoSkeleton from '@/components/space/detail/facilityInfoSkeleton';
import SpaceImageListComponent from '@/components/space/detail/imageList';
import SpaceImageListSkeleton from '@/components/space/detail/imageListSkeleton';
import SpaceIntroduceComponent from '@/components/space/detail/introduce';
import SpaceIntroduceSkeleton from '@/components/space/detail/introduceSkeleton';
import SpaceLocationInfoComponent from '@/components/space/detail/locationInfo';
import SpaceLocationInfoSkeleton from '@/components/space/detail/locationInfoSkeleton';
import SpaceNoticeComponent from '@/components/space/detail/notice';
import SpaceNoticeSkeleton from '@/components/space/detail/noticeSkeleton';
import { useGetSpaceDetailData } from '@/hooks/space/space';

const { width } = Dimensions.get('screen');

export default function SpaceDetail() {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useGetSpaceDetailData(Number(id));

  const spaceDetailData = data || {
    id: 1,
    name: '공간 이름',
    nearestSubway: {
      lineNumber: '2호선',
      stationName: '성수역',
      distance: 633,
    },
    analysis: {
      title: '전국 20대 여성 유동인구 상위 5%',
      description: '주로 사진 촬영 목적 방문이 많아요.',
    },
    imageUrls: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    openingTime: '18:00:00',
    closingTime: '18:00:00',
    size: 30,
    tags: ['태그1', '태그2'],
    pricePerDay: 100000,
    discountRate: 10,
    discountPrice: 9000,
    details: '공간 상세 소개',
    latitude: 37.123456,
    longitude: 127.123456,
    city: '서울',
    district: '강남구',
    address: '강남대로 123',
    detailAddress: '123동 123호',
    contactNumber: '010-1234-5678',
    notices: ['채팅 상담을 추천드려요', '설치 및 철수는 계약 기간 내 포함이에요'],
    likeCount: 10,
    isLiked: false,
    messageRoomId: 1,
    isActivated: true,
    facilityInfos: [
      {
        key: 'CCTV',
        number: 1,
      },
    ],
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    // SpaceImageListComponent의 높이(width)보다 스크롤이 내려갔는지 확인합니다.
    if (scrollPosition >= width) {
      if (!isScrolled) {
        setIsScrolled(true);
      }
    } else {
      if (isScrolled) {
        setIsScrolled(false);
      }
    }
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-black relative">
      {isScrolled ? <BackHeaderComponent hasSafeArea={false} /> : <FloatingBackHeader />}

      <ScrollView
        contentContainerStyle={{ backgroundColor: '#FFFFFF', paddingBottom: 160 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {isLoading ? (
          <>
            <SpaceImageListSkeleton />
            <SpaceBasicInfoSkeleton />
            <SpaceIntroduceSkeleton />
            <SpaceFacilityInfoSkeleton />
            <SpaceLocationInfoSkeleton />
            <SpaceNoticeSkeleton />
          </>
        ) : (
          <>
            <SpaceImageListComponent data={spaceDetailData} />
            <SpaceBasicInfoComponent data={spaceDetailData} />
            <SpaceIntroduceComponent data={spaceDetailData} />
            <SpaceFacilityInfoComponent data={spaceDetailData} />
            <SpaceLocationInfoComponent data={spaceDetailData} />
            <SpaceNoticeComponent data={spaceDetailData} />
          </>
        )}
      </ScrollView>

      <View className="absolute -bottom-[100px] w-full bg-white h-[500px] -z-10" />

      <BottomButtonContainer spaceId={Number(id)} data={spaceDetailData} />
    </SafeAreaView>
  );
}
