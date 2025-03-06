import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';

import { useReportChatRoom } from '@/hooks/message/message';

interface ReportModalComponentProps {
  isVisible: boolean;
  chatRoomId: number;
  spaceName: string;
  closeModal: () => void;
}

const ReportModalComponent: React.FC<ReportModalComponentProps> = ({
  isVisible,
  chatRoomId,
  spaceName,
  closeModal,
}) => {
  const router = useRouter();

  const [reason, setReason] = useState<string>('');

  const { mutateAsync: reportChatRoom } = useReportChatRoom();

  const handleReport = () => {
    reportChatRoom({
      messageRoomId: chatRoomId,
      reason: reason,
    });
    router.back();
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View
        onTouchEnd={closeModal}
        className="flex h-screen w-screen items-center justify-center bg-basic px-5"
      >
        <View
          onTouchEnd={(e) => e.stopPropagation()}
          className="w-full flex-col gap-y-6 rounded-xl bg-white p-4 pt-6"
        >
          <Text className="text-center font-H2 text-H2 leading-H2 text-dark_gray">
            {spaceName} 신고
          </Text>

          <View className="gap-y-2">
            <Text className="pl-2">하단에 신고 사유를 작성해주세요!</Text>
            <TextInput
              className="bg-back_gray rounded-lg p-4"
              value={reason}
              onChangeText={(text) => setReason(text)}
            />
          </View>

          <View className="flex flex-row justify-between">
            <Pressable onPress={closeModal} className="flex-1">
              <Text className="py-[13px] text-center font-SUB3 text-SUB3 leading-SUB3 text-medium_gray">
                취소
              </Text>
            </Pressable>

            <Pressable onPress={handleReport} className="flex-1">
              <Text className="py-[13px] text-center font-SUB3 text-SUB3 leading-SUB3 text-red">
                신고하기
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReportModalComponent;
