import { Image } from 'expo-image';
import { Alert, Pressable, Text, TouchableOpacity, View } from 'react-native';

import SendIcon from '@/assets/icons/send.svg';
import { useCancelReservation } from '@/hooks/reservation/reservation';
import { ReservationItem } from '@/types/reservation';
import { calculateDurationInDays, formatToCompactDate } from '@/utils/dateUtils';

interface ReservationItemComponentProps {
  type: 'PENDING' | 'ACCEPT' | 'CANCEL';
  data: ReservationItem;
}

const ReservationItemComponent: React.FC<ReservationItemComponentProps> = ({ type, data }) => {
  const { mutateAsync: cancelReservation } = useCancelReservation(type);

  const handleCancel = () => {
    Alert.alert('예약을 취소하시겠습니까?', '예약 취소 시 복구할 수 없습니다.', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => cancelReservation(data.reservationId),
      },
    ]);
  };

  return (
    <Pressable className="border border-stroke rounded-lg bg-white mx-[20px]">
      <View className="p-[16px] flex flex-col">
        <View className="flex flex-row justify-between gap-x-[8px]">
          <View className="flex flex-col shrink gap-y-[8px] py-[8px]">
            <View>
              <Text className="CAP1 text-medium_gray">
                {data.city} · {data.district}
              </Text>
              <Text numberOfLines={2} ellipsizeMode="tail" className="H2 text-black">
                {data.spaceName}
              </Text>
            </View>
            <Text className="CAP1 text-light_gray">
              {data.size}m² · {data.capacity}명 수용 가능
            </Text>
          </View>

          <Image source={data.spaceImage} style={{ width: 120, height: 120, borderRadius: 12 }} />
        </View>

        <View className="flex flex-col gap-y-[4px] mt-[24px] mb-[16px]">
          <View className="flex flex-row justify-between items-center">
            <Text className="CAP1 text-semiLight_gray">대여 기간</Text>
            <View className="flex flex-row items-center gap-x-[8px]">
              <Text className="CAP1 text-deep_gray">
                {formatToCompactDate(data.startDate)} ~ {formatToCompactDate(data.endDate)}
              </Text>
              <Text className="CAP1 text-purple">
                ({calculateDurationInDays(data.startDate, data.endDate)}일)
              </Text>
            </View>
          </View>

          <View className="flex flex-row justify-between items-center">
            <Text className="CAP1 text-semiLight_gray">총 대여 가격</Text>
            <Text className="SUB1 text-black">{data.totalPrice.toLocaleString()}원</Text>
          </View>
        </View>

        {type === 'PENDING' && (
          <View className="flex flex-row items-center gap-x-[8px]">
            <TouchableOpacity className="border border-stroke rounded-lg p-[14px]">
              <SendIcon />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 border border-stroke rounded-lg py-[15.5px]">
              <Text className="BTN1 text-medium_gray text-center">대기 취소</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 border border-stroke rounded-lg py-[15.5px]">
              <Text className="BTN1 text-medium_gray text-center">기간 변경</Text>
            </TouchableOpacity>
          </View>
        )}

        {type === 'ACCEPT' && (
          <View className="flex flex-row items-center gap-x-[8px]">
            <TouchableOpacity className="border border-stroke rounded-lg p-[14px]">
              <SendIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 border border-stroke rounded-lg py-[15.5px]"
            >
              <Text className="BTN1 text-medium_gray text-center">예약 취소</Text>
            </TouchableOpacity>
          </View>
        )}

        {type === 'CANCEL' && (
          <View className="bg-light_gray py-[16.5px] rounded-lg">
            <Text className="BTN1 text-white text-center">예약 취소됨</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default ReservationItemComponent;
