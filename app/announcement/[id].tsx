import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '@/components/icon/icon';
import { useGetAnnouncementDetailData } from '@/hooks/announcement/announcement';
import { useToggleAnnouncementLike } from '@/hooks/like/like';
import { translateTime } from '@/utils/time';

export default function RecruitDetailScreen() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const { data, refetch } = useGetAnnouncementDetailData(Number(id));

  const { mutateAsync: announcementLike } = useToggleAnnouncementLike(refetch);

  const width = Dimensions.get('screen').width;

  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / width);
    setCurrentIndex(index + 1);
  };

  console.log(data);

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1 bg-black">
        <View className="ml-[3px] flex flex-row items-start justify-start">
          <Pressable onPress={() => router.back()} className="p-3">
            <Icon.WhiteLeftArrow />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100,
            backgroundColor: 'white',
          }}
          bounces={false}
        >
          <View className="relative">
            <FlatList
              data={data.imageUrls}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{ width: width, height: 210, resizeMode: 'cover' }}
                />
              )}
              bounces={false}
              horizontal={true}
              nestedScrollEnabled={true}
              disableIntervalMomentum={false}
              scrollEventThrottle={16}
              snapToInterval={width} // 화면 너비만큼 스냅
              decelerationRate="fast" // 스크롤 속도 줄임
              showsHorizontalScrollIndicator={false} // 스크롤 바 숨김
              onScroll={handleScroll}
            />
            <View className="absolute bottom-5 right-5 rounded-full bg-basic px-1.5 py-1">
              <Text className="font-BTN1 text-BTN1 text-white">
                {currentIndex} / {data.imageUrls.length}
              </Text>
            </View>
          </View>

          <View className="mt-8 px-5">
            <View className="flex flex-row items-center justify-between">
              <Text className="mr-[22px] font-H2 text-H2 leading-H2">{data.title}</Text>
              <View className="flex flex-col items-center">
                <Pressable onPress={() => announcementLike(data.id)}>
                  {data.isLiked ? <Icon.FilledLike /> : <Icon.Like />}
                </Pressable>
                <Text
                  className={`font-CAP2 text-CAP2 leading-CAP2 ${
                    data.isLiked ? 'text-purple' : 'text-semiLight_gray'
                  }`}
                >
                  {data.likeCount}
                </Text>
              </View>
            </View>

            <View className="my-6 h-[1px] w-full bg-stroke" />
            <View className="flex flex-col gap-y-2">
              <View className="flex flex-row">
                <Text className="mr-5 font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                  해당 지역
                </Text>
                <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray ">
                  {data.city}{' '}
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className=" mr-5 font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                  공간 위치
                </Text>
                <Text className="max-w-[290px] font-CAP1 text-CAP1 leading-CAP1 text-deep_gray ">
                  {data.district} + {data.address}
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="mr-5 font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                  지원 대상
                </Text>
                <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                  {data.target}
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="mr-5 font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                  모집 기간
                </Text>
                <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                  {translateTime(data.recruitmentStartAt)} ~{' '}
                  {translateTime(data.recruitmentStartAt)}
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="mr-5 font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                  문의 번호
                </Text>
                <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                  {data.contactNumber}
                </Text>
              </View>
            </View>
          </View>

          <View className="my-6 h-2 w-full bg-stroke" />
          <View className="px-5">
            <Text className="mb-4 font-SUB2 text-SUB2 leading-SUB2">지원 공고 소개</Text>
            <Text className="font-BODY1 text-BODY1 leading-BODY1 text-deep_gray">
              {data.details}
            </Text>
          </View>
        </ScrollView>

        <View className="fixed bottom-0 flex flex-row gap-x-3 border-t border-t-stroke bg-white px-5 py-4">
          <Pressable
            onPress={() => Linking.openURL(data.websiteUrl)}
            className="flex flex-1 flex-row gap-x-2 items-center justify-center rounded-lg border border-stroke bg-black px-4 py-3.5"
          >
            <Icon.Globe />
            <Text className="font-BTN1 text-BTN1 text-white leading-BTN1">
              공고 페이지 바로가기
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
