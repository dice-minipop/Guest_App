import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { SpaceDetailComponentProps } from '@/types/space';
import renderFacilityIcon from '@/utils/facilityIcon';

import CustomPressable from '../../common/customPressable/customPressable';

const getFacilityName = (key: string) => {
  switch (key) {
    case 'cctv':
      return 'CCTV';
    case 'chair':
      return '의자';
    case 'circleTable':
      return '원형테이블';
    case 'couch':
      return '쇼파';
    case 'desktop':
      return '데스크탑';
    case 'drink':
      return '음료수 보관대';
    case 'fireExtinguisher':
      return '소화기';
    case 'fire_alarm':
      return '화재경보기';
    case 'firstAidKit':
      return '구급 상자';
    case 'light':
      return '공간별 조명 밝기 조절 가능';
    case 'monitor':
      return '모니터';
    case 'printer':
      return '프린터·복사기';
    case 'projector':
      return '빔프로젝터';
    case 'shelf':
      return '진열대';
    case 'speaker':
      return '스피커';
    case 'squareTable':
      return '사각테이블';
    case 'standingTable':
      return '스탠딩테이블';
    case 'tv':
      return 'TV';
    case 'waterPurifier':
      return '정수기';
    case 'wifi':
      return 'Wi-fi';
    default:
      return key;
  }
};

const getFacilityDescription = (key: string, number: number) => {
  if (key === 'light') {
    return '공간별 조명 밝기 조절 가능';
  }

  if (key === 'cctv' || key === 'wifi' || key === 'fire_alarm' || key === 'firstAidKit') {
    return getFacilityName(key);
  }

  const name = getFacilityName(key);
  const count = number ?? 0;

  return `${name} ${count}개`;
};

export default function SpaceFacilityInfoComponent({ data }: SpaceDetailComponentProps) {
  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);

  return (
    <View>
      <View className="gap-y-[16px] px-[20px]">
        <View className="gap-y-[16px]">
          <Text className="SUB2 text-black">시설·집기 이용 안내</Text>

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
                  textBreakStrategy="highQuality"
                  lineBreakStrategyIOS="standard"
                >
                  {getFacilityDescription(item.key, item.number)}
                </Text>
              </View>
            )}
            numColumns={2}
            scrollEnabled={false}
          />
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
