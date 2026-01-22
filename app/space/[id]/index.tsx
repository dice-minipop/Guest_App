import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RefObject, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CoverViewComponent from '@/components/common/coverView';
import FloatingBackHeader from '@/components/common/floatingBackHeader';
import SpaceBasicInfoComponent from '@/components/space/detail/basicInfo';
import BottomButtonContainer from '@/components/space/detail/bottomButtonContainer';
import SpaceFacilityInfoComponent from '@/components/space/detail/facilityInfo';
import SpaceImageListComponent from '@/components/space/detail/imageList';
import SpaceIntroduceComponent from '@/components/space/detail/introduce';
import SpaceLocationInfoComponent from '@/components/space/detail/locationInfo';
import SpaceNoticeComponent from '@/components/space/detail/notice';
import ReservationModalComponent from '@/components/space/detail/reservationModal';
import { useGetSpaceDetailData } from '@/hooks/space/space';

export default function SpaceDetail() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const { top } = useSafeAreaInsets();

  const { data } = useGetSpaceDetailData(Number(id));

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <View className="flex-1 bg-white">
      <View style={{ height: top, backgroundColor: '#000000' }} />
      <FloatingBackHeader />
      <CoverViewComponent height={500} top={-100} />

      <ScrollView contentContainerStyle={{ backgroundColor: '#FFFFFF', paddingBottom: 160 }}>
        <SpaceImageListComponent data={data} />
        <SpaceBasicInfoComponent data={data} />
        <View className="h-[8px] bg-back_gray my-[24px]" />
        <SpaceIntroduceComponent data={data} />
        <View className="h-[8px] bg-back_gray my-[24px]" />
        <SpaceFacilityInfoComponent data={data} />
        <View className="h-[8px] bg-back_gray my-[24px]" />
        <SpaceLocationInfoComponent data={data} />
        <View className="h-[8px] bg-back_gray my-[24px]" />
        <SpaceNoticeComponent data={data} />
      </ScrollView>

      <BottomButtonContainer bottomSheetRef={bottomSheetRef as RefObject<BottomSheetMethods>} />

      <ReservationModalComponent
        spaceId={Number(id)}
        bottomSheetRef={bottomSheetRef as RefObject<BottomSheetMethods>}
        onRoute={() => router.push('/space/1/complete')}
      />
    </View>
  );
}
