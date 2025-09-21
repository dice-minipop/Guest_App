import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import FilledLikeIcon from '@/assets/icons/filled-like.svg';
import LikeIcon from '@/assets/icons/like.svg';
import MapIcon from '@/assets/icons/spaceDetail/map.svg';
import PeopleIcon from '@/assets/icons/spaceDetail/people.svg';
import PlaceIcon from '@/assets/icons/spaceDetail/place.svg';
import RightArrowIcon from '@/assets/icons/spaceDetail/right-arrow.svg';
import { useToggleSpaceLike } from '@/hooks/like/like';
import { SpaceDetailComponentProps } from '@/types/space';
import getSubwayColor from '@/utils/subwayColor';

export default function SpaceBasicInfoComponent({ data }: SpaceDetailComponentProps) {
  const router = useRouter();

  const { mutateAsync: spaceLike } = useToggleSpaceLike(data.id);

  return (
    <View>
      <View className="pl-[20px] pt-[26px] gap-y-[24px]">
        <View className="flex flex-col gap-y-[24px]">
          <View className="flex flex-row justify-between pr-[5px]">
            <View className="flex flex-col mt-[6px]">
              <Text className="H2 text-black">{data.name}</Text>

              <View className="flex flex-row items-center gap-x-[8px]">
                <View className="flex flex-row items-center gap-x-[2px]">
                  <PlaceIcon />
                  <View className="flex flex-row items-center gap-x-[4px]">
                    <View
                      className="rounded-full px-[6px]"
                      style={{ backgroundColor: getSubwayColor('2호선') }}
                    >
                      <Text className="CAP1 text-white">2호선</Text>
                    </View>

                    <Text className="SUB3 text-semiLight_gray">성수역에서 350m</Text>
                  </View>
                </View>

                <Pressable
                  onPress={() => router.push(`/space/${data.id}/map`)}
                  className="flex flex-row items-center gap-x-[2px] py-[12px] self-start"
                >
                  <MapIcon />
                  <Text className="CAP1 text-purple underline">지도 보기</Text>
                </Pressable>
              </View>
            </View>

            <Pressable
              onPress={() => spaceLike()}
              className="flex flex-col items-center py-[8px] self-start"
            >
              {data.isLiked ? <FilledLikeIcon /> : <LikeIcon />}
              <Text
                className={`CAP2 text-center w-12 ${data.isLiked ? 'text-purple' : 'text-semiLight_gray'}`}
              >
                {data.likeCount > 999 ? '999+' : data.likeCount}
              </Text>
            </Pressable>
          </View>

          <View>
            <View className="flex flex-row items-center gap-x-[8px]">
              <Text className="CAP1 text-dark_gray">1일 대여</Text>
              <Text className="CAP1 text-semiLight_gray line-through">
                {data.pricePerDay.toLocaleString()}원
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-[6px]">
              <Text className="SUB2 text-purple">{data.discountRate}%</Text>
              <Text className="SUB1 text-black">{data.discountPrice.toLocaleString()}원</Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => router.push(`/space/${data.id}/analysis`)}
          className="flex flex-col gap-y-[16px] rounded-lg border border-stroke p-[16px] mr-[20px]"
        >
          <View className="flex flex-col items-center">
            <Text className="CAP2 text-medium_gray text-center">성수2가1동 유동인구 핵심 분석</Text>

            <View className="flex flex-row items-center gap-x-[8px] mt-[8px] mb-[4px]">
              <PeopleIcon />
              <Text className="SUB2 text-purple">전국 20대 여성 유동인구 상위 5%</Text>
            </View>

            <Text className="BODY1 text-dark_gray text-center">
              주로 사진 촬영 목적 방문이 많아요
            </Text>
          </View>

          <View className="h-[1px] bg-stroke" />

          <View className="flex flex-row justify-center items-center gap-x-[4px]">
            <Text className="CAP1 text-semiLight_gray">
              선택한 모든 브랜드 타겟 유동인구 더보기
            </Text>
            <RightArrowIcon />
          </View>
        </Pressable>

        <View className="flex flex-col gap-y-[20px] pr-[20px]">
          <View className="flex flex-col gap-y-[8px]">
            <View className="flex flex-row items-start gap-x-[20px]">
              <Text className="CAP1 text-deep_gray">영업 시간</Text>
              <Text className="CAP1 text-deep_gray">
                {data.openingTime} ~ {data.closingTime}
              </Text>
            </View>

            <View className="flex flex-row items-start gap-x-[20px]">
              <Text className="CAP1 text-deep_gray">공간 크기</Text>
              <Text className="CAP1 text-deep_gray">
                {data.size}㎡ ({data.size * 0.3025}평)
              </Text>
            </View>
          </View>

          <View className="h-[1px] bg-stroke" />

          <View className="gap-y-[5px]">
            <Text className="CAP1 text-black">동네 해시태그</Text>
            <View className="flex flex-row flex-wrap gap-[4px]">
              {data.tags.map((item) => (
                <View
                  key={item}
                  className="flex flex-row items-center gap-x-[2px] px-[10px] py-[4px] border border-stroke rounded-full"
                >
                  <Text className="CAP1 text-light_gray">#</Text>
                  <Text className="CAP1 text-deep_gray">{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View className="h-[8px] bg-back_gray my-[24px]" />
    </View>
  );
}
