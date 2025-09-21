import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import AnnouncementBasicInfo from '@/components/announcement/detail/basicInfo';
import AnnouncementImageList from '@/components/announcement/detail/imageList';
import AnnouncementIntroduce from '@/components/announcement/detail/introduce';
import BackHeaderComponent from '@/components/common/backHeader';
import { dummyData } from '@/constants/dummyData/announcementDetail';
import { useGetAnnouncementDetailData } from '@/hooks/announcement/announcement';

export default function AnnouncementDetail() {
  const { id } = useLocalSearchParams();

  const { bottom } = useSafeAreaInsets();

  // const { data } = useGetAnnouncementDetailData(Number(id));
  const data = dummyData;

  return (
    <View className="flex-1 bg-white">
      <BackHeaderComponent />

      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
        <AnnouncementImageList data={data} />
        <AnnouncementBasicInfo data={data} />
        <View className="h-[8px] bg-back_gray my-[24px]" />
        <AnnouncementIntroduce data={data} />
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={{ height: bottom, backgroundColor: '#FFFFFF' }} />
    </View>
  );
}
