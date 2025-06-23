import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { SpaceDetailComponentProps } from '@/types/space';
import renderFacilityIcon from '@/utils/facilityIcon';

import CustomPressableComponent from '../../common/customPressable';

const SpaceFacilityInfoComponent: React.FC<SpaceDetailComponentProps> = ({ data }) => {
  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);

  const dummydata = [
    { title: 'water-purifier', description: '정수기 1개' },
    { title: 'cctv', description: 'CCTV' },
    { title: 'fire-extinguisher', description: '소화기 2개' },
    { title: 'couch', description: '쇼파 1개' },
    { title: 'circle-table', description: '원형테이블 4개' },
    { title: 'monitor', description: '모니터 3개' },
    { title: 'projector', description: '빔프로젝터 1개' },
    { title: 'wifi', description: 'Wi-fi' },
    { title: 'square-table', description: '사각테이블 9개' },
    { title: 'tv', description: 'TV 1개' },
    { title: 'drink', description: '음료수 보관대 2개' },
    { title: 'firealarm', description: '화재경보기' },
    { title: 'shelf', description: '진열대 4개' },
    { title: 'standing-table', description: '스탠딩테이블 7개' },
    { title: 'first-aid-kit', description: '구급 상자' },
    { title: 'chair', description: '의자 2개' },
    { title: 'printer', description: '프린터·복사기 2개' },
    { title: 'desktop', description: '데스크탑 3개' },
    { title: 'light', description: '공간별 조명 밝기 조절 가능' },
    { title: 'speaker', description: '스피커 4개' },
  ];

  return (
    <View className="gap-y-[16px]">
      <View className="gap-y-[16px] px-[20px]">
        <Text className="SUB2 text-black">시설·집기 이용 안내</Text>
        {/* <Text className="BODY1 text-deep_gray">· {data.facilityInfo}</Text> */}

        <FlatList
          contentContainerStyle={{ rowGap: 16 }}
          columnWrapperStyle={{ columnGap: 16 }}
          data={isSeeMore ? dummydata : dummydata.slice(0, 6)}
          renderItem={({ item }) => (
            <View key={item.title} className="flex-1 flex flex-row items-center gap-x-[8px]">
              <View className="bg-back_gray p-[11px] rounded-lg border border-stroke">
                {renderFacilityIcon(item.title)}
              </View>
              <Text
                className="flex-1 BODY1 text-deep_gray"
                // TODO : 안드로이드에서 "음료수 보관대 2개" 줄바꿈 문제 해결
                textBreakStrategy="simple"
                lineBreakStrategyIOS="standard"
              >
                {item.description ?? ''}
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
};

export default SpaceFacilityInfoComponent;
