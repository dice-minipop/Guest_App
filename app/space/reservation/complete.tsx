import { CommonActions, useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CheckPolygonIcon from '@/assets/icons/spaceDetail/check-polygon.svg';

export default function ReservationComplete() {
  const { reservationId, name, startDate, endDate, totalPrice } = useLocalSearchParams();

  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1">
        <View className="mt-[120px] flex flex-col px-[20px] gap-y-[48px]">
          <View className="flex flex-col items-center gap-y-[40px]">
            <CheckPolygonIcon />
            <Text className="H2 text-black text-center">예약이 완료되었습니다 :{')'}</Text>
          </View>

          <View className="flex flex-col gap-y-[4px] p-[16px] bg-back_gray rounded-lg">
            <View className="flex flex-row justify-between items-center">
              <Text className="BODY1 text-medium_gray">예약 공간</Text>
              <Text className="BODY1 text-dark_gray">{name}</Text>
            </View>

            <View className="flex flex-row justify-between items-center">
              <Text className="BODY1 text-medium_gray">예약 번호</Text>
              <Text className="BODY1 text-dark_gray">{reservationId}</Text>
            </View>

            <View className="flex flex-row justify-between items-center">
              <Text className="BODY1 text-medium_gray">대여 기간</Text>
              <Text className="BODY1 text-dark_gray">
                {startDate} ~ {endDate}
              </Text>
            </View>

            <View className="flex flex-row justify-between items-center">
              <Text className="BODY1 text-medium_gray">대여 금액</Text>
              <Text className="BODY1 text-dark_gray">{Number(totalPrice).toLocaleString()}원</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: '(tabs)' }],
            }),
          )
        }
        className="bg-black my-[16px] py-[15.5px] mx-[20px] rounded-lg"
      >
        <Text className="BTN1 text-white text-center">확인</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
