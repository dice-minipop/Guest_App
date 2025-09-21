import BottomSheet from '@gorhom/bottom-sheet';
import { Fragment, RefObject, useRef } from 'react';
import { Text, View } from 'react-native';

import ChatIcon from '@/assets/icons/chat.svg';
import ReservationIcon from '@/assets/icons/reservation.svg';
import OpacityPressable from '@/components/common/opacityPressable';
import { SpaceDetailItem } from '@/types/space';

import ReservationModalComponent from './reservationModal';

interface BottomButtonContainerProps {
  spaceId: number;
  data?: SpaceDetailItem;
}

export default function BottomButtonContainer({ spaceId, data }: BottomButtonContainerProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <Fragment>
      <View className="bg-white border-t border-t-stroke">
        <View className="flex flex-row gap-x-[8px] px-[20px] pt-[16px] pb-[50px]">
          <OpacityPressable className="px-[14.5px] py-[14px] border border-light_gray rounded-lg">
            <ChatIcon />
          </OpacityPressable>

          <OpacityPressable
            onPress={() => bottomSheetRef.current?.expand()}
            className="flex-1 flex flex-row justify-center items-center gap-x-[8px] bg-black rounded-lg py-[15px]"
          >
            <ReservationIcon />
            <Text className="BTN1 text-white">공간 예약 신청</Text>
          </OpacityPressable>
        </View>
      </View>

      {data !== undefined && (
        <ReservationModalComponent
          spaceId={spaceId}
          data={data}
          bottomSheetRef={bottomSheetRef as RefObject<BottomSheet>}
        />
      )}
    </Fragment>
  );
}
