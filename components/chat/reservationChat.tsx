import { Pressable, Text, View } from 'react-native';

import ApprovedSVG from '@/assets/image/reservationChat/reservationApproved.svg';
import CancelSVG from '@/assets/image/reservationChat/reservationCancel.svg';
import CompleteSVG from '@/assets/image/reservationChat/reservationComplete.svg';
import FixedSVG from '@/assets/image/reservationChat/reservationFixed.svg';
import RemitSVG from '@/assets/image/reservationChat/reservationRemit.svg';
import WarningSVG from '@/assets/image/reservationChat/reservationWarning.svg';
import TossIcon from '@/assets/image/reservationChat/toss.svg';

interface ReservationChatItemProps {
  type: 'COMPLETE' | 'APPROVED' | 'WARNING' | 'FIXED' | 'CANCEL' | 'REMIT';
}

export default function ReservationChatItem({ type }: ReservationChatItemProps) {
  function handleColor() {
    switch (type) {
      case 'APPROVED':
        return 'bg-green';

      case 'WARNING':
        return 'bg-red';

      case 'FIXED':
        return 'bg-purple';

      default:
        return 'bg-black';
    }
  }

  return (
    <Pressable className="w-3/5">
      <View className={`rounded-t-xl flex justify-center items-center h-[120px] ${handleColor()}`}>
        {type === 'COMPLETE' && <CompleteSVG />}
        {type === 'APPROVED' && <ApprovedSVG />}
        {type === 'WARNING' && <WarningSVG />}
        {type === 'FIXED' && <FixedSVG />}
        {type === 'CANCEL' && <CancelSVG />}
        {type === 'REMIT' && <RemitSVG />}
      </View>

      <View className="bg-white rounded-b-xl p-[12px]">
        {type === 'APPROVED' && (
          <View>
            <Text className="BTN1 text-medium_gray">
              계좌번호 : {process.env.EXPO_PUBLIC_ACCOUNT_BANK}{' '}
              {process.env.EXPO_PUBLIC_ACCOUNT_NUMBER}
            </Text>

            <Pressable className="flex flex-row justify-center items-center gap-x-[8px] border border-stroke rounded-lg py-[11.5px]">
              <TossIcon />
              <Text className="BTN1 text-medium_gray">토스로 송금하기</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
}
