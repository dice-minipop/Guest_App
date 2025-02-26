// import {
//   NaverMapMarkerOverlay,
//   NaverMapView,
//   NaverMapViewRef,
// } from '@mj-studio/react-native-naver-map';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Linking,
} from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

import LoadingComponent from '@/components/common/loadingComponent';
import Icon from '@/components/icon/icon';
// import DateModalComponent from '@/components/spaceDetail/dateModal';
import { useToggleSpaceLike } from '@/hooks/like/like';
import { useGetFilteredSpaceLists, useGetSpaceDetailData } from '@/hooks/space/space';
import { copyText } from '@/utils/clipboard';
import { makeCall, makeMessage } from '@/utils/phoneCall';
import { useSpaceFilteringStore } from '@/zustands/filter/store';

const SpaceDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const { filtering } = useSpaceFilteringStore();

  const width = Dimensions.get('screen').width;

  // const mapRef = useRef<NaverMapViewRef>(null);
  // const mapRef = useRef<MapView>(null);

  const { data, refetch, isPending: isGetDataPending } = useGetSpaceDetailData(Number(id));
  const { refetch: refetchList } = useGetFilteredSpaceLists(filtering);

  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / width);
    setCurrentIndex(index + 1);
  };

  // const [isFullDescription, setIsFullDescription] = useState<boolean>(true);
  // const [numOfUsageInformation, setNumOfUsageInformation] = useState<number>(3);

  const { mutateAsync: spaceLike } = useToggleSpaceLike(refetch, refetchList);

  // const [isReservationModalVisible, setIsReservationModalVisible] = useState<boolean>(false);

  console.log(data.websiteUrl);

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      {isGetDataPending && <LoadingComponent />}
      <SafeAreaView className={`flex-1 bg-black ${Platform.OS === 'android' && 'pt-[50px]'}`}>
        <View className="ml-[3px] flex flex-row items-start justify-start">
          <Pressable onPress={() => router.back()} className="p-3">
            <Icon.WhiteLeftArrow />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 64,
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
                  style={{ width: width, height: width, resizeMode: 'cover' }}
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
            <View className="flex flex-row items-start justify-between">
              <View className="flex flex-col">
                <Text className="font-H2 text-H2 leading-H2 text-black">{data.name}</Text>
                <Text className="mb-4 font-SUB3 text-SUB3 leading-SUB3 text-semiLight_gray">
                  {data.description}
                </Text>
                <View className="flex flex-col">
                  <Text className="font-CAP1 text-CAP1 leading-CAP1 text-light_gray">1일 대여</Text>

                  <View className="flex flex-row items-center gap-x-1.5">
                    <Text className="font-SUB2 text-SUB2 leading-SUB2 text-purple">
                      {data.discountRate}%
                    </Text>
                    <Text className="font-SUB1 text-SUB1 leading-SUB1 text-black">
                      {data.pricePerDay.toLocaleString()}원
                    </Text>
                  </View>
                </View>
              </View>

              <Pressable onPress={() => spaceLike(data.id)} className="flex flex-col items-center">
                {data.isLiked ? <Icon.FilledLike /> : <Icon.Like />}
                <Text
                  className={`font-CAP2 text-CAP2 leading-CAP2 ${
                    data.isLiked ? 'text-purple' : 'text-semiLight_gray'
                  }`}
                >
                  {data.likeCount}
                </Text>
              </Pressable>
            </View>

            <View className="my-6 h-[1px] bg-stroke" />

            <View className="mb-5 flex flex-row gap-x-5">
              <View className="flex flex-col justify-center gap-y-2">
                <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">공간유형</Text>
                <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">영업 시간</Text>
                <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">수용인원</Text>
              </View>

              <View className="flex flex-col justify-center gap-y-2">
                <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                  {data.category}
                </Text>
                <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                  {data.openingTime} ~ {data.closingTime}
                </Text>
                <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                  최대 {data.capacity}인
                </Text>
              </View>
            </View>

            <View className="flex flex-row flex-wrap gap-1">
              {data.tags.map((item, index) => (
                <Text
                  key={index}
                  className="rounded-full border border-stroke px-2.5 py-1 font-CAP1 text-CAP1 text-light_gray"
                >
                  # <Text className="text-deep_gray">{item}</Text>
                </Text>
              ))}
            </View>
          </View>

          <View className="my-6 h-2 bg-back_gray" />

          <View className="gap-y-4 px-5">
            <Text className="font-SUB2 text-SUB2 leading-SUB2">팝업공간 소개</Text>
            <Text className="font-BODY1 text-BODY1 leading-BODY1 text-deep_gray">
              {/* {isFullDescription ? data.description : data.description.slice(0, 90) + '...'} */}
              {data.description}
            </Text>
            {/* <Pressable
              onPress={() => setIsFullDescription(!isFullDescription)}
              className="relative flex flex-row items-center justify-center rounded-lg border border-stroke p-4"
            >
              <Text className="text-center font-BTN1 text-BTN1 leading-BTN1 text-medium_gray text-">
                {isFullDescription ? '간략히 보기' : '자세히 보기'}
              </Text>
              <View className={`absolute right-4 ${isFullDescription && 'rotate-180'}`}>
                <Icon.DownArrow />
              </View>
            </Pressable> */}
          </View>

          <View className="my-6 h-2 bg-back_gray" />

          <View className="gap-y-4 px-5">
            <Text className="font-SUB2 text-SUB2 leading-SUB2">위치 및 정보 안내</Text>
            <View className="gap-y-1">
              <View className="flex flex-row items-center justify-between flex-wrap">
                <View className="flex flex-row items-center gap-x-0.5">
                  <Icon.Place />
                  <Text className="font-BODY1 text-BODY1 leading-BODY1 text-dark_gray">
                    {data.city + ' ' + data.district + ' ' + data.address}
                  </Text>
                </View>
                <Pressable
                  onPress={() => copyText(data.city + ' ' + data.district + ' ' + data.address)}
                  className="ml-auto"
                >
                  <Text className="underline text-CAP2 font-CAP2 leading-CAP2 text-medium_gray">
                    주소 복사
                  </Text>
                </Pressable>
              </View>
              {/* <Text className="pl-[26px] font-BODY1 text-BODY1 leading-BODY1 text-medium_gray">
                · {data.}
              </Text> */}
            </View>
            {/* <MapView
              ref={mapRef}
              zoomEnabled={false}
              style={{ width: '100%', height: 160, borderRadius: 12, flex: 1 }}
              initialRegion={{
                latitude: 37.5665,
                longitude: 126.978,
                latitudeDelta: 0.001,
                longitudeDelta: 0.0421,
              }}
              onMapReady={() => {
                mapRef.current?.animateToRegion({
                  latitude: data.latitude,
                  longitude: data.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                });
              }}
            >
              <Marker coordinate={{ latitude: data.latitude, longitude: data.longitude }}>
                <Icon.Marker />
              </Marker>
            </MapView> */}
            {/* <NaverMapView
              ref={mapRef}
              style={{ width: '100%', height: 160, borderRadius: 12, flex: 1 }}
              mapType="Basic"
              isShowLocationButton={false}
              isShowZoomControls={false}
              isShowScaleBar={false}
              locale="ko"
              region={{
                latitude: data.latitude,
                longitude: data.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: -0.00001,
              }}
            >
              <NaverMapMarkerOverlay
                key={'marker-0'}
                latitude={data.latitude}
                longitude={data.longitude}
                anchor={{ x: 0.5, y: 1 }}
                width={32}
                height={32}
              >
                <View className="flex-1">
                  <Icon.Marker />
                </View>
              </NaverMapMarkerOverlay>
            </NaverMapView> */}

            <Pressable
              onPress={() => Linking.openURL(data.websiteUrl)}
              className="flex flex-row justify-center items-center gap-x-1 rounded-lg border border-stroke p-4"
            >
              <Icon.WebSite />
              <Text className="text-center font-BTN1 text-BTN1 text-medium_gray leading-BTN1">
                웹사이트 바로가기
              </Text>
            </Pressable>
          </View>

          <View className="my-6 h-2 bg-back_gray" />

          <View className="gap-y-4 px-5">
            <Text className="font-SUB2 text-SUB2 leading-SUB2">시설 이용 안내</Text>
            <Text className="font-BODY1 text-BODY1 text-deep_gray">· {data.facilityInfo}</Text>
            {/* <View className="flex flex-col gap-y-1">
              {data.facilityInfo
                .slice(0, numOfUsageInformation)
                .map((item, index) => (
                  <Text
                    key={index}
                    className="font-BODY1 text-BODY1 text-deep_gray"
                  >
                    · {item}
                  </Text>
                ))}
            </View> */}
            {/* <Pressable
              onPress={() =>
                numOfUsageInformation === 3
                  ? setNumOfUsageInformation(data.usageInformation.length)
                  : setNumOfUsageInformation(3)
              }
              className="relative flex flex-row items-center justify-center rounded-lg border border-stroke p-4"
            >
              <Text className="text-center font-BTN1 text-BTN1 text-medium_gray">
                {numOfUsageInformation === 3 ? "자세히 보기" : "간략히 보기"}
              </Text>
              <View
                className={`absolute right-4 ${
                  numOfUsageInformation !== 3 && "rotate-180"
                }`}
              >
                <DownArrow />
              </View>
            </Pressable> */}
          </View>

          <View className="my-6 h-2 bg-back_gray" />

          <View className="gap-y-4 px-5">
            <Text className="font-SUB2 text-SUB2 leading-SUB2">공지사항 안내</Text>
            <View className="flex flex-col gap-y-1 rounded-lg bg-back_gray p-4">
              <Text className="font-BODY1 text-BODY1 leading-BODY1 text-deep_gray">
                * {data.notice}
              </Text>
              {/* {data.noticeInformation.map((item, index) => (
                <Text
                  key={index}
                  className="font-BODY1 text-BODY1 text-deep_gray"
                >
                  * {item}
                </Text>
              ))} */}
            </View>
          </View>
        </ScrollView>

        <View className="fixed bottom-0 flex flex-row gap-x-2 border-t border-t-stroke bg-white px-5 py-4">
          <Pressable
            onPress={() => makeCall(data.contactNumber)}
            className="rounded-lg border border-stroke p-3.5"
          >
            <Icon.Phone />
          </Pressable>

          {/* <Pressable
            onPress={() => makeMessage(data.contactNumber)}
            className="rounded-lg border border-stroke p-3.5"
          >
            <Icon.FilledSend />
          </Pressable> */}

          <Pressable
            onPress={() => makeMessage(data.contactNumber)}
            className="flex flex-1 flex-row items-center justify-center gap-x-2 rounded-lg border border-stroke bg-black px-4 py-3.5"
          >
            <Icon.Message />
            <Text className="font-BTN1 text-BTN1 leading-BTN1 text-white">메시지 보내기</Text>
          </Pressable>
        </View>
      </SafeAreaView>
      <SafeAreaView className="bg-white" />

      {/* <DateModalComponent
        isVisible={isReservationModalVisible}
        closeModal={() => setIsReservationModalVisible(false)}
      /> */}
    </View>
  );
};

export default SpaceDetailScreen;
