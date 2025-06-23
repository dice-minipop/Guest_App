import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import AnnouncementBasicInfoComponent from '@/components/announcement/detail/basicInfo';
import AnnouncementImageListComponent from '@/components/announcement/detail/imageList';
import AnnouncementIntroduceComponent from '@/components/announcement/detail/introduce';
import BackHeaderComponent from '@/components/common/backHeader';
import { useGetAnnouncementDetailData } from '@/hooks/announcement/announcement';

export default function AnnouncementDetail() {
  const { id } = useLocalSearchParams();

  const { bottom } = useSafeAreaInsets();

  // const { data } = useGetAnnouncementDetailData(Number(id));

  const data = {
    id: 1,
    title: '이름',
    city: '서울',
    district: '중랑구',
    address: '머시기로',
    hostName: '호스트네임',
    target: '소상공인',
    imageUrls: ['https://picsum.photos/250/250'],
    recruitmentStartAt: '시작시간',
    recruitmentEndAt: '끝시간',
    details:
      '소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개소개',
    contactNumber: '010-1234-5678',
    websiteUrl: 'https://google.co.kr',
    isLiked: false,
    likeCount: 123,
    status: '상태',
  };

  return (
    <View className="flex-1 bg-white">
      <BackHeaderComponent />

      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
        <AnnouncementImageListComponent data={data} />
        <AnnouncementBasicInfoComponent data={data} />
        <View className="h-[8px] bg-back_gray my-[24px]" />
        <AnnouncementIntroduceComponent data={data} />
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={{ height: bottom, backgroundColor: '#FFFFFF' }} />
    </View>
  );
}
