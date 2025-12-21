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
          <Text className="CAP1 text-dark_gray">
            팝업스토어 행사 이름<Text className="text-red">*</Text>
          </Text>
          <TextInput
            className="border border-light_gray rounded-lg h-14 p-4 INPUT text-dark_gray"
            value={reservationData.eventName}
            placeholder="팝업스토어 행사 이름을 입력해주세요"
            placeholderTextColor={'#CCCCCC'}
            onChangeText={(e) => setReservationData('eventName', e)}
          />
        </View>

        <View className="gap-y-[8px]">
          <Text className="CAP1 text-dark_gray">
            행사 내용<Text className="text-red">*</Text>
          </Text>
          <TextInput
            className="border border-light_gray rounded-lg h-24 p-4 INPUT text-dark_gray"
            multiline={true}
            value={reservationData.eventContent}
            placeholder="팝업 공간을 대여해주는 호스트와 신뢰할 수 있는 거래를 위해 행사 내용을 1~2문장으로 짧게 설명해주세요"
            placeholderTextColor={'#CCCCCC'}
            onChangeText={(e) => setReservationData('eventContent', e)}
          />
        </View>

        {/* <View className="gap-y-[8px]">
          <View className="flex flex-row justify-between">
            <Text className="CAP1 text-dark_gray">행사 내용 관련 첨부 파일</Text>
            <TouchableOpacity>
              <Text className="CAP1 text-dark_gray">+ 추가</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <View className="gap-y-[8px]">
          <Text className="CAP1 text-dark_gray">
            기타 요청사항 <Text className="text-light_gray">(선택)</Text>
          </Text>
          <TextInput
            className="border border-light_gray rounded-lg h-24 p-4 INPUT text-dark_gray"
            multiline={true}
            value={reservationData.etcRequest}
            placeholder="협의가 필요한 사항이나 문의하실 내용이 있으시면 작성해주세요"
            placeholderTextColor={'#CCCCCC'}
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
