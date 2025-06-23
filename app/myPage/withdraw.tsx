import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DownArrowIcon from '@/assets/icons/myPage/downArrow.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import { WithdrawReasons } from '@/constants/withdrawReason';
import { useWithdraw } from '@/hooks/auth/auth';
import { useGetGuestInfo } from '@/hooks/guest/guest';

export default function Withdraw() {
  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // const { data } = useGetGuestInfo();

  const data = {
    name: '정진혁',
  };

  const { mutateAsync: withdraw } = useWithdraw();
  const [withdrawReason, setWithdrawReason] = useState<string>('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" hasSafeArea={false} title="탈퇴하기" />

      <View className="px-[20px] gap-y-[32px] mt-[32px]">
        <View className="gap-y-[8px]">
          <Text className="SUB2 text-black">
            {data.name.slice(1, 3)}님과 이별한다니{'\n'}너무 아쉽습니다
          </Text>

          <Text className="BODY1 text-medium_gray">
            회원님께서 탈퇴를 원하신다니 저희 서비스가 많이 부족하고 미흡했나 봅니다. 더 나은
            서비스를 제공하는 플랫폼이 될 수 있도록 노력하겠습니다.
          </Text>
        </View>

        <View className="gap-y-[8px]">
          <Text className="SUB2 text-black">탈퇴 전 확인 부탁드립니다</Text>
          <Text className="BODY1 text-medium_gray">
            계정을 삭제하시면 예약, 프로필, 찜, 쪽지 등 모든 활동 정보가 삭제됩니다. 계정 삭제 후
            00일간 재가입할 수 없습니다.
          </Text>
        </View>

        <View className="gap-y-[8px]">
          <Text className="SUB3 text-black">
            더 나은 다이스가 될 수 있도록{'\n'}탈퇴하시는 이유를 알려주시면 감사하겠습니다
          </Text>

          <Pressable
            onPress={() => bottomSheetRef.current?.expand()}
            className="flex flex-row items-center justify-between border border-light_gray rounded-lg pl-[16px]"
          >
            <Text className="BODY2 text-dark_gray">
              {withdrawReason !== '' ? withdrawReason : '탈퇴하시는 이유가 무엇인가요?'}
            </Text>
            <View className="p-[10px]">
              <DownArrowIcon />
            </View>
          </Pressable>
        </View>
      </View>

      <View className="absolute bottom-0 flex flex-row items-center gap-x-[12px] px-[20px] pt-[16px] pb-[50px] border-t border-t-stroke">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-1 bg-white rounded-lg py-[15.5px] border border-stroke"
        >
          <Text className="BTN1 text-medium_gray text-center">취소</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-black rounded-lg py-[15.5px] border border-black">
          <Text className="BTN1 text-white text-center">제출</Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[530]}
        maxDynamicContentSize={530}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={0.7} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
      >
        <BottomSheetView className="flex-1">
          <View className="gap-y-[4px] px-[20px] pt-[8px]">
            {WithdrawReasons.map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  setWithdrawReason(item);
                  bottomSheetRef.current?.close();
                }}
                className={`px-[16px] py-[14px] rounded-lg ${withdrawReason === item ? 'bg-back_gray' : 'bg-white'}`}
              >
                <Text
                  className={`SUB3 ${withdrawReason === item ? 'text-black' : 'text-medium_gray'}`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
