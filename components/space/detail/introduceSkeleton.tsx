import { useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, Text, View } from 'react-native';

import CustomPressable from '../../common/customPressable/customPressable';

export default function SpaceIntroduceSkeleton() {
  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);

  return (
    <View>
      <View className="gap-y-[16px] px-[20px]">
        <View className="gap-y-[16px]">
          <Text className="SUB2 text-black">팝업 공간 소개</Text>

          <ContentLoader
            speed={2}
            width={Dimensions.get('screen').width - 40}
            height={76}
            backgroundColor="#ecebeb"
            foregroundColor="#f3f3f3"
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Dimensions.get('screen').width - 40}
              height="24"
            />
            <Rect
              x="0"
              y="26"
              rx="4"
              ry="4"
              width={Dimensions.get('screen').width - 40}
              height="24"
            />
            <Rect
              x="0"
              y="52"
              rx="4"
              ry="4"
              width={Dimensions.get('screen').width - 120}
              height="24"
            />
          </ContentLoader>
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
