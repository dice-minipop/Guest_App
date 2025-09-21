import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import OpacityPressable from '@/components/common/opacityPressable';
import { useCreateReservation } from '@/hooks/reservation/reservation';
import { useCreateReservationStore } from '@/zustands/reservation/store';

export default function ReservationInputInformation() {
  const { mutateAsync: createReservation } = useCreateReservation();

  const { reservationData, setReservationData } = useCreateReservationStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" title="예약 신청" hasSafeArea={false} />

      <ScrollView
        className="flex-1 px-[20px]"
        contentContainerStyle={{ rowGap: 24, paddingBottom: 80 }}
      >
        <View className="gap-y-[8px] pt-[32px] pb-[8px]">
          <Text className="H2 text-black">진행할 팝업스토어에 대한{'\n'}정보를 입력해주세요</Text>
          <Text className="BODY2 text-deep_gray">
            호스트가 팝업스토어의 성격과 목적을 정확히 이해하고,{'\n'}원활하게 공간 예약 여부를
            검토할 수 있도록 도와줘요
          </Text>
        </View>

        <View className="gap-y-[8px]">
          <Text className="CAP1 text-dark_gray">팝업스토어 행사 이름</Text>
          <TextInput
            className="border"
            value={reservationData.eventName}
            onChangeText={(e) => setReservationData('eventName', e)}
          />
        </View>

        <View className="gap-y-[8px]">
          <Text className="CAP1 text-dark_gray">행사 내용</Text>
          <TextInput
            className="border"
            value={reservationData.eventContent}
            onChangeText={(e) => setReservationData('eventContent', e)}
          />
        </View>

        <View className="gap-y-[8px]">
          <View className="flex flex-row justify-between">
            <Text className="CAP1 text-dark_gray">행사 내용 관련 첨부 파일</Text>
            <TouchableOpacity>
              <Text className="CAP1 text-dark_gray">+ 추가</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="gap-y-[8px]">
          <Text className="CAP1 text-dark_gray">
            기타 요청사항 <Text className="text-light_gray">(선택)</Text>
          </Text>
          <TextInput
            className="border"
            value={reservationData.etcRequest}
            onChangeText={(e) => setReservationData('etcRequest', e)}
          />
        </View>
      </ScrollView>

      <OpacityPressable onPress={() => createReservation(reservationData)}>
        <View className="bg-black my-[16px] py-[15.5px] mx-[20px] rounded-lg">
          <Text className="BTN1 text-white text-center">예약 신청</Text>
        </View>
      </OpacityPressable>
    </SafeAreaView>
  );
}
