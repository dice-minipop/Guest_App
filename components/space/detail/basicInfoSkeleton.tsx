import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, Pressable, Text, View } from 'react-native';

import LikeIcon from '@/assets/icons/like.svg';
import MapIcon from '@/assets/icons/spaceDetail/map.svg';
import PlaceIcon from '@/assets/icons/spaceDetail/place.svg';

export default function SpaceBasicInfoSkeleton() {
  return (
    <View>
      <View className="pl-[20px] pt-[26px] gap-y-[24px]">
        <View className="flex flex-col gap-y-[24px]">
          <View className="flex flex-row justify-between pr-[5px]">
            <View className="flex flex-col mt-[6px]">
              <ContentLoader
                speed={2}
                width={250}
                height={31}
                backgroundColor="#ecebeb"
                foregroundColor="#f3f3f3"
              >
                <Rect x="0" y="0" rx="4" ry="4" width={250} height="31" />
              </ContentLoader>

              <View className="flex flex-row items-center gap-x-[8px]">
                <View className="flex flex-row items-center gap-x-[2px]">
                  <PlaceIcon />
                  <View className="flex flex-row items-center gap-x-[4px]">
                    <ContentLoader
                      speed={2}
                      width={43}
                      height={20}
                      backgroundColor="#ecebeb"
                      foregroundColor="#f3f3f3"
                    >
                      <Rect x="0" y="0" rx="12" ry="12" width={43} height="20" />
                    </ContentLoader>

                    <ContentLoader
                      speed={2}
                      width={120}
                      height={24}
                      backgroundColor="#ecebeb"
                      foregroundColor="#f3f3f3"
                    >
                      <Rect x="0" y="0" rx="12" ry="12" width={120} height="24" />
                    </ContentLoader>
                  </View>
                </View>

                <Pressable
                  disabled={true}
                  className="flex flex-row items-center gap-x-[2px] py-[12px] self-start"
                >
                  <MapIcon />
                  <Text className="CAP1 text-purple underline">지도 보기</Text>
                </Pressable>
              </View>
            </View>

            <Pressable className="w-[48px] flex flex-col items-center py-[8px] self-start">
              <LikeIcon />
              <ContentLoader
                speed={2}
                width={24}
                height={18}
                backgroundColor="#ecebeb"
                foregroundColor="#f3f3f3"
              >
                <Rect x="0" y="2" rx="4" ry="4" width={24} height="14" />
              </ContentLoader>
            </Pressable>
          </View>

          <View className="gap-y-[4px]">
            <View className="flex flex-row items-center gap-x-[8px]">
              <Text className="CAP1 text-dark_gray">1일 대여</Text>
              <ContentLoader
                speed={2}
                width={80}
                height={20}
                backgroundColor="#ecebeb"
                foregroundColor="#f3f3f3"
              >
                <Rect x="0" y="0" rx="4" ry="4" width={80} height="20" />
              </ContentLoader>
            </View>

            <View className="flex flex-row items-center gap-x-[6px]">
              <ContentLoader
                speed={2}
                width={40}
                height={27}
                backgroundColor="#ecebeb"
                foregroundColor="#f3f3f3"
              >
                <Rect x="0" y="0" rx="4" ry="4" width={40} height="27" />
              </ContentLoader>

              <ContentLoader
                speed={2}
                width={120}
                height={28}
                backgroundColor="#ecebeb"
                foregroundColor="#f3f3f3"
              >
                <Rect x="0" y="0" rx="4" ry="4" width={120} height="28" />
              </ContentLoader>
            </View>
          </View>
        </View>

        <ContentLoader
          speed={2}
          width={Dimensions.get('screen').width - 40}
          height={166}
          backgroundColor="#ecebeb"
          foregroundColor="#f3f3f3"
        >
          <Rect
            x="0"
            y="0"
            rx="8"
            ry="8"
            width={Dimensions.get('screen').width - 40}
            height="166"
          />
        </ContentLoader>

        <View className="flex flex-col gap-y-[20px] pr-[20px]">
          <View className="flex flex-col gap-y-[8px]">
            <View className="flex flex-row items-start gap-x-[20px]">
              <Text className="CAP1 text-deep_gray">영업 시간</Text>
              <ContentLoader
                speed={2}
                width={62}
                height={20}
                backgroundColor="#ecebeb"
                foregroundColor="#f3f3f3"
              >
                <Rect x="0" y="0" rx="4" ry="4" width={62} height="20" />
              </ContentLoader>
            </View>

            <View className="flex flex-row items-start gap-x-[20px]">
              <Text className="CAP1 text-deep_gray">공간 크기</Text>
              <ContentLoader
                speed={2}
                width={80}
                height={20}
                backgroundColor="#ecebeb"
                foregroundColor="#f3f3f3"
              >
                <Rect x="0" y="0" rx="4" ry="4" width={80} height="20" />
              </ContentLoader>
            </View>
          </View>

          <View className="h-[1px] bg-stroke" />

          <View className="gap-y-[5px]">
            <Text className="CAP1 text-black">동네 해시태그</Text>
            <View className="flex flex-row flex-wrap gap-[4px]">
              {[152, 112, 168].map((item) => (
                <ContentLoader
                  key={item}
                  speed={2}
                  width={item}
                  height={28}
                  backgroundColor="#ecebeb"
                  foregroundColor="#f3f3f3"
                >
                  <Rect x="0" y="0" rx="16" ry="16" width={item} height="28" />
                </ContentLoader>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View className="h-[8px] bg-back_gray my-[24px]" />
    </View>
  );
}
