import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { SpaceDetailComponentProps } from '@/types/space';
import renderFacilityIcon, { getFacilityLabel } from '@/utils/facilityIcon';

import CustomPressableComponent from '../../common/customPressable';

export default function SpaceFacilityInfoComponent({ data }: SpaceDetailComponentProps) {
  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);

  return (
    <View className="gap-y-[16px]">
      <View className="gap-y-[16px] px-[20px]">
        <Text className="SUB2 text-black">시설·집기 이용 안내</Text>
        {/* <Text className="BODY1 text-deep_gray">· {data.facilityInfo}</Text> */}

        <FlatList
          contentContainerStyle={{ rowGap: 16 }}
          columnWrapperStyle={{ columnGap: 16 }}
          data={isSeeMore ? data.facilityInfos : data.facilityInfos.slice(0, 6)}
          renderItem={({ item }) => (
            <View key={item.key} className="flex-1 flex flex-row items-center gap-x-[8px]">
              <View className="bg-back_gray p-[11px] rounded-lg border border-stroke">
                {renderFacilityIcon(item.key)}
              </View>
              <Text
                className="flex-1 BODY1 text-deep_gray"
                // TODO : 안드로이드에서 "음료수 보관대 2개" 줄바꿈 문제 해결
                textBreakStrategy="simple"
                lineBreakStrategyIOS="standard"
              >
                {getFacilityLabel(item.key, item.number)}
              </Text>
            </View>
          )}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>

      <CustomPressableComponent
        buttonText={isSeeMore ? '간략히 보기' : '자세히 보기'}
        onPress={() => setIsSeeMore(!isSeeMore)}
        disabled={false}
        color="WHITE"
        arrow={isSeeMore ? 'UP' : 'DOWN'}
      />
    </View>
  );
}
