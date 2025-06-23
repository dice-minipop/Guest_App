import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Text, TouchableOpacity, View } from 'react-native';

import ChatIcon from '@/assets/icons/chat.svg';
import PhoneIcon from '@/assets/icons/phone.svg';
import ReservationIcon from '@/assets/icons/reservation.svg';

interface BottomButtonContainerProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}

const BottomButtonContainer: React.FC<BottomButtonContainerProps> = ({ bottomSheetRef }) => {
  return (
    <View className="flex flex-row items-center gap-x-[8px] px-[20px] pt-[16px] pb-[50px] border-t border-t-stroke">
      <TouchableOpacity className="p-[14px] border border-light_gray rounded-lg">
        <PhoneIcon />
      </TouchableOpacity>
      <TouchableOpacity className="px-[14.5px] py-[14px] border border-light_gray rounded-lg">
        <ChatIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => bottomSheetRef.current?.expand()}
        className="flex-1 flex flex-row justify-center items-center gap-x-[8px] bg-black rounded-lg py-[15px]"
      >
        <ReservationIcon />
        <Text className="BTN1 text-white">공간 예약하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomButtonContainer;
