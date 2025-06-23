import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import FilledLikeIcon from '@/assets/icons/filled-like.svg';
import LikeIcon from '@/assets/icons/like.svg';
import MapIcon from '@/assets/icons/spaceDetail/map.svg';
import PlaceIcon from '@/assets/icons/spaceDetail/place.svg';
import RightArrowIcon from '@/assets/icons/spaceDetail/rightArrow.svg';
import { useKakaoSubway } from '@/hooks/useKakaoSubway';
import { SpaceDetailComponentProps } from '@/types/space';
import getSubwayColor from '@/utils/subwayColor';

const SpaceBasicInfoComponent: React.FC<SpaceDetailComponentProps> = ({ data }) => {
  const router = useRouter();

  // const { data: SubwayData } = useKakaoSubway(data.latitude, data.longitude);

  return (
    <View className="pl-[20px] pt-[26px] gap-y-[24px]">
      <View className="flex flex-col gap-y-[24px]">
        <View className="flex flex-row justify-between pr-[5px]">
          <View className="flex flex-col mt-[6px]">
            <Text className="H2 text-black">{data.name}</Text>
            {/* <Text className="SUB3 text-semiLight_gray">{data.description}</Text> */}

            <View className="flex flex-row items-center gap-x-[8px]">
              <View className="flex flex-row items-center gap-x-[2px]">
                <PlaceIcon />
                {/* <View className="flex flex-row items-center gap-x-[4px]">
                  <View
                    className="rounded-full px-[6px]"
                    style={{ backgroundColor: getSubwayColor(SubwayData?.lineName as string) }}
                  >
                    <Text className="CAP1 text-white">{SubwayData?.lineName}</Text>
                  </View>

                  <Text className="SUB3 text-semiLight_gray">
                    {SubwayData?.stationName}에서 {SubwayData?.distance}m
                  </Text>
                </View> */}
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

          <Pressable className="flex flex-col items-center py-[8px] self-start">
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
            <Text className="SUB1 text-black">{data.pricePerDay.toLocaleString()}원</Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => router.push(`/space/${data.id}/analysis`)}
        className="flex flex-row justify-between mr-[20px] rounded-lg border border-stroke"
      >
        <View className="p-[16px] pr-0">
          <Text className="BTN1 text-dark_gray mb-[4px]">성수2가1동 유동인구 핵심 분석</Text>
          <Text className="SUB2 text-purple">전국 20대 여성 유동인구 상위 5%</Text>
          <Text className="BODY1 text-deep_gray">주로 사진 촬영 목적 방문이 많아요</Text>
        </View>

        <View className="flex justify-center items-center w-[48px] bg-back_gray">
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
              {data.capacity}㎡ ({data.capacity * 0.3025}평)
            </Text>
          </View>
        </View>

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
  );
};

export default SpaceBasicInfoComponent;
