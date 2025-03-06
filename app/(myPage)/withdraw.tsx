import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, View, Text, Platform } from 'react-native';

import CustomTwoBtnModal from '@/components/common/customTwoBtnModal';
import LoadingComponent from '@/components/common/loadingComponent';
import Icon from '@/components/icon/icon';
import WithdrawModalComponent from '@/components/myPage/withdrawModal';
import { useWithdraw } from '@/hooks/auth/auth';
import { useGetGuestInfo } from '@/hooks/guest/guest';

const WithdrawScreen = () => {
  const router = useRouter();

  const [reason, setReason] = useState<string>('');

  const { mutateAsync: withdraw, isPending } = useWithdraw();
  const { data: guestInfo } = useGetGuestInfo();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState<boolean>(false);

  const items: string[] = [
    '앱/웹 방문을 잘 하지 않아요',
    '원하는 팝업 공간을 찾기 어려웠어요',
    '지원 공고가 부족하거나 활용하기 어려웠어요',
    '예약 및 일정 관리 기능이 불편했어요',
    '호스트(게스트)와의 소통이 원활하지 않았어요',
    '찜하기 기능이 불편했어요',
    '기타',
  ];

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === 'android' && 'pt-[50px]'}`}>
      <StatusBar style="dark" />
      {isPending && <LoadingComponent />}
      <View className="flex flex-row justify-between items-center px-1 relative">
        <Pressable onPress={() => router.back()} className="p-3">
          <Icon.BlackLeftArrow />
        </Pressable>

        <Text className="absolute left-1/2 -translate-x-1/2 text-SUB3 font-SUB3 leading-SUB3">
          탈퇴하기
        </Text>
      </View>
      <View className="px-5 pt-8 gap-y-8">
        <View className="gap-y-2">
          <Text className="text-SUB2 font-SUB2 leading-SUB2">
            {guestInfo.name}님과 이별한다니{'\n'}너무 아쉽습니다
          </Text>
          <Text className="text-BODY1 font-BODY1 leading-BODY1 text-medium_gray">
            회원님께서 탈퇴를 원하신다니 저희 서비스가 많이 부족하고 미흡했나 봅니다. 더 나은
            서비스를 제공하는 플랫폼이 될 수 있도록 노력하겠습니다.
          </Text>
        </View>

        <View className="gap-y-2">
          <Text className="text-SUB2 font-SUB2 leading-SUB2">탈퇴 전 확인 부탁드립니다</Text>
          <Text className="text-BODY1 font-BODY1 leading-BODY1 text-medium_gray">
            계정을 삭제하시면 예약, 프로필, 찜, 쪽지 등 모든 활동 정보가 삭제됩니다. 계정 삭제 후
            00일간 재가입할 수 없습니다.
          </Text>
        </View>

        <View className="gap-y-2">
          <Text className="text-SUB3 font-SUB3 leading-SUB3">
            더 나은 다이스가 될 수 있도록{'\n'}탈퇴하시는 이유를 알려주시면 감사하겠습니다
          </Text>
          <Pressable
            onPress={() => setIsModalVisible(true)}
            className="rounded-lg border border-light_gray pl-4 flex flex-row justify-between items-center"
          >
            <Text
              className={`text-BODY2 font-BODY2 leading-BODY2 ${reason !== '' ? 'text-black' : 'text-dark_gray'}`}
            >
              {reason !== '' ? reason : '탈퇴하시는 이유가 무엇인가요?'}
            </Text>
            <View className="p-2.5">
              <Icon.BlackDownArrow />
            </View>
          </Pressable>
        </View>
      </View>
      <View
        className={`absolute flex flex-row px-5 gap-x-3 ${Platform.OS === 'ios' ? 'bottom-[50px]' : 'bottom-4'}`}
      >
        <Pressable className="rounded-lg bg-white border border-stroke px-4 py-[15.5px] flex-1">
          <Text className="text-BTN1 font-BTN1 leading-BTN1 text-medium_gray text-center">
            취소
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setIsWithdrawModalVisible(true)}
          className="rounded-lg bg-black border border-stroke px-4 py-[15.5px] flex-1"
        >
          <Text className="text-BTN1 font-BTN1 leading-BTN1 text-white text-center">제출</Text>
        </Pressable>
      </View>

      <WithdrawModalComponent
        isVisible={isModalVisible}
        items={items}
        closeModal={() => setIsModalVisible(false)}
        value={reason}
        handleValue={(text) => setReason(text)}
      />

      <CustomTwoBtnModal
        isVisible={isWithdrawModalVisible}
        closeModal={() => setIsWithdrawModalVisible(false)}
        title="회원 탈퇴 시 회원님의 모든 데이터(개인 정보, 활동 내역 등)가 삭제됩니다. 그래도 회원을 탈퇴하시겠습니까?"
        leftBtnText="취소"
        leftBtnFunc={() => setIsWithdrawModalVisible(false)}
        rightBtnText="확인"
        rightBtnFunc={() => withdraw()}
      />
    </SafeAreaView>
  );
};

export default WithdrawScreen;
