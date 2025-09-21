import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, Pressable, Text, View } from 'react-native';

import MarkerIcon from '@/assets/icons/spaceDetail/marker.svg';

export default function SpaceLocationInfoSkeleton() {
  return (
    <View>
      <View className="gap-y-[16px]">
        <View className="px-[20px] gap-y-[16px]">
          <Text className="SUB2 text-black">위치 안내</Text>

          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-x-[2px]">
              <MarkerIcon />
              <ContentLoader
                speed={2}
                width={200}
                height={24}
                backgroundColor="#ecebeb"
                foregroundColor="#f3f3f3"
              >
                <Rect x="0" y="0" rx="4" ry="4" width="200" height="24" />
              </ContentLoader>
            </View>

            <Pressable className="px-[8px]">
              <Text className="CAP2 text-medium_gray underline">주소 복사</Text>
            </Pressable>
          </View>

          <ContentLoader
            speed={2}
            width={Dimensions.get('screen').width - 40}
            height={160}
            backgroundColor="#ecebeb"
            foregroundColor="#f3f3f3"
          >
            <Rect
              x="0"
              y="0"
              rx="12"
              ry="12"
              width={Dimensions.get('screen').width - 40}
              height={160}
            />
          </ContentLoader>
        </View>
      </View>

      <View className="h-[8px] bg-back_gray my-[24px]" />
    </View>
  );
}
