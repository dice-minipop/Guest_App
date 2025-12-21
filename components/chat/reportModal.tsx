import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import XIcon from '@/assets/icons/spaceDetail/x.svg';
import OpacityPressable from '@/components/common/opacityPressable';

interface ReportModalProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  onReport?: (reason: string) => void;
}

const REPORT_REASONS = [
  '부적절한 언어 사용',
  '스팸 또는 광고',
  '성희롱 또는 성적 비하',
  '욕설 또는 비방',
  '기타',
];

export default function ReportModal({ bottomSheetRef, onReport }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');

  const handleReport = () => {
    if (!selectedReason) {
      Alert.alert('신고 사유를 선택해주세요.');
      return;
    }

    if (onReport) {
      onReport(selectedReason);
    } else {
      // 기본 동작: 신고 완료 알림
      Alert.alert('신고가 접수되었습니다.', '검토 후 조치하겠습니다.', [
        {
          text: '확인',
          onPress: () => {
            bottomSheetRef.current?.close();
            setSelectedReason('');
          },
        },
      ]);
    }
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
    setSelectedReason('');
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[420]}
      maxDynamicContentSize={420}
      index={-1}
      enablePanDownToClose={true}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} opacity={0.7} disappearsOnIndex={-1} appearsOnIndex={0} />
      )}
    >
      <BottomSheetView className="h-[400px]">
        <View className="h-[400px] bg-white">
          <View className="flex flex-row items-center justify-between pl-[20px] pr-[3px]">
            <Text className="H2 text-black py-[8.5px]">신고하기</Text>

            <OpacityPressable onPress={handleClose}>
              <View className="p-[12px]">
                <XIcon />
              </View>
            </OpacityPressable>
          </View>

          <View className="h-[1px] bg-stroke mx-[20px]" />

          <View className="flex-1 px-[20px] pt-[24px]">
            <Text className="SUB3 text-black mb-[16px]">신고 사유를 선택해주세요</Text>

            <View className="gap-y-[12px]">
              {REPORT_REASONS.map((reason) => (
                <OpacityPressable
                  key={reason}
                  onPress={() => setSelectedReason(reason)}
                  className="flex flex-row items-center"
                >
                  <View
                    className={`w-[20px] h-[20px] rounded-full border-2 mr-[12px] ${
                      selectedReason === reason
                        ? 'border-purple bg-purple'
                        : 'border-light_gray bg-white'
                    }`}
                  >
                    {selectedReason === reason && (
                      <View className="w-full h-full rounded-full bg-purple items-center justify-center">
                        <View className="w-[8px] h-[8px] rounded-full bg-white" />
                      </View>
                    )}
                  </View>
                  <Text className="BODY1 text-black">{reason}</Text>
                </OpacityPressable>
              ))}
            </View>
          </View>

          <View className="bg-white px-[20px] pb-[32px] pt-[16px]">
            <View className="flex flex-row gap-x-[8px]">
              <OpacityPressable
                onPress={handleClose}
                className="flex-1 rounded-lg border border-stroke px-4 py-[15.5px]"
              >
                <Text className="BTN1 text-black text-center">취소</Text>
              </OpacityPressable>

              <OpacityPressable
                onPress={handleReport}
                disabled={!selectedReason}
                className={`flex-1 rounded-lg px-[16px] py-[15.5px] ${
                  selectedReason ? 'bg-red' : 'bg-light_gray'
                }`}
              >
                <Text className="BTN1 text-white text-center">신고하기</Text>
              </OpacityPressable>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
