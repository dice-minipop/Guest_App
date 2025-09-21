import { useState } from 'react';
import { Text, View } from 'react-native';

import { SpaceDetailComponentProps } from '@/types/space';

import CustomPressable from '../../common/customPressable/customPressable';

export default function SpaceIntroduceComponent({ data }: SpaceDetailComponentProps) {
  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);

  return (
    <View>
      <View className="gap-y-[16px] px-[20px]">
        <View className="gap-y-[16px]">
          <Text className="SUB2 text-black">팝업 공간 소개</Text>
          <Text numberOfLines={isSeeMore ? undefined : 3} className="BODY1 text-deep_gray">
            {data.details}
          </Text>
        </View>

        <CustomPressable
          buttonText={isSeeMore ? '간략히 보기' : '자세히 보기'}
          onPress={() => setIsSeeMore(!isSeeMore)}
          disabled={false}
          color="WHITE"
          arrow={isSeeMore ? 'UP' : 'DOWN'}
        />
      </View>

      <View className="h-[8px] bg-back_gray my-[24px]" />
    </View>
  );
}
