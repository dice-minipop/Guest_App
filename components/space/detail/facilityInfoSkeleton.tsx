import { useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, FlatList, Text, View } from 'react-native';

import CustomPressable from '../../common/customPressable/customPressable';

export default function SpaceFacilityInfoSkeleton() {
  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);

  return (
    <View>
      <View className="gap-y-[16px] px-[20px]">
        <View className="gap-y-[16px]">
          <Text className="SUB2 text-black">시설·집기 이용 안내</Text>

          <FlatList
            contentContainerStyle={{ rowGap: 16 }}
            columnWrapperStyle={{ columnGap: 16 }}
            data={Array.from({ length: 8 }, (_, i) => i + 1)}
            renderItem={({ item }) => (
              <View key={item}>
                <ContentLoader
                  speed={2}
                  width={(Dimensions.get('screen').width - 56) / 2}
                  height={52}
                  backgroundColor="#ecebeb"
                  foregroundColor="#f3f3f3"
                >
                  <Rect x="0" y="0" rx="8" ry="8" width="52" height="52" />
                  <Rect x="60" y="14" rx="4" ry="4" width="70" height="24" />
                </ContentLoader>
              </View>
            )}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>

        <CustomPressable
          buttonText={isSeeMore ? '간략히 보기' : '자세히 보기'}
          onPress={() => setIsSeeMore(!isSeeMore)}
          disabled={true}
          color="WHITE"
          arrow={isSeeMore ? 'UP' : 'DOWN'}
        />
      </View>

      <View className="h-[8px] bg-back_gray my-[24px]" />
    </View>
  );
}
