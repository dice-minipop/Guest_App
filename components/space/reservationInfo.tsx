import { Text, View } from 'react-native';

import CheckPolygonIcon from '@/assets/icons/spaceDetail/check-polygon.svg';
import { ReservationData } from '@/zustands/reservation/type';

interface ReservationInfoComponentProps {
  data: ReservationData;
}

const ReservationInfoComponent: React.FC<ReservationInfoComponentProps> = ({ data }) => {
  return (
    <View className="mt-[120px] flex flex-col px-[20px] gap-y-[48px]">
      <View className="flex flex-col items-center gap-y-[40px]">
        <CheckPolygonIcon />
        <Text className="H2 text-black text-center">예약이 완료되었습니다 :{')'}</Text>
      </View>

      <View className="flex flex-col gap-y-[4px] p-[16px] bg-back_gray rounded-lg">
        <View className="flex flex-row justify-between items-center">
          <Text className="BODY1 text-medium_gray">예약 공간</Text>
          <Text className="BODY1 text-dark_gray">{data.id}</Text>
        </View>

        <View className="flex flex-row justify-between items-center">
          <Text className="BODY1 text-medium_gray">예약 번호</Text>
          <Text className="BODY1 text-dark_gray">{data.id}</Text>
        </View>

        <View className="flex flex-row justify-between items-center">
          <Text className="BODY1 text-medium_gray">대여 기간</Text>
          <Text className="BODY1 text-dark_gray">
            {data.startDate} ~ {data.endDate}
          </Text>
        </View>

        <View className="flex flex-row justify-between items-center">
          <Text className="BODY1 text-medium_gray">대여 금액</Text>
          <Text className="BODY1 text-dark_gray">{data.id}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReservationInfoComponent;
