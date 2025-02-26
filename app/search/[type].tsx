import { useLocalSearchParams, usePathname } from 'expo-router';
import React, { Suspense, useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import RecruitItemComponent from '@/components/announcement/announcementItem';
import Icon from '@/components/icon/icon';
import CardComponent from '@/components/space/card';
import { useGetSearchedAnnouncementLists } from '@/hooks/announcement/announcement';
import { useToggleAnnouncementLike, useToggleSpaceLike } from '@/hooks/like/like';
import { useGetSearchedSpaceLists } from '@/hooks/space/space';

const SearchScreen = () => {
  const path = usePathname();

  console.log(path);

  const { type } = useLocalSearchParams();

  console.log(type);

  const [keyword, setKeyword] = useState<string>('');

  const {
    data: searchedSpace,
    fetchNextPage: fetchSpaceNextPage,
    hasNextPage: hasSpaceNextPage,
    refetch: refetchSpace,
    isPending: isSpacePending,
  } = useGetSearchedSpaceLists(type as string, keyword);
  const { mutateAsync: spaceLike } = useToggleSpaceLike(refetchSpace);

  const {
    data: searchedAnnouncement,
    fetchNextPage: fetchAnnouncementNextPage,
    hasNextPage: hasAnnouncementNextPage,
    refetch: refetchAnnouncement,
    isPending: isAnnouncementPending,
  } = useGetSearchedAnnouncementLists(keyword);
  const { mutateAsync: announcementLike } = useToggleAnnouncementLike(refetchAnnouncement);

  return (
    <Suspense>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-white">
          {/* <Pressable className="flex flex-row items-center gap-x-1 rounded-lg bg-white pb-3.5 pl-[13px] pr-2 pt-[13px]"> */}
          <Icon.Magnifier />
          <Text className="text-medium_gray">찾는 지역이나 지하철역으로 검색해보세요</Text>
          {/* </Pressable> */}
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="검색어를 입력하세요"
            returnKeyType="search" // 엔터 키를 검색 버튼으로 설정
            onSubmitEditing={() => {
              console.log('검색 실행:', keyword);
              if (type === 'space') {
                refetchSpace();
              } else if (type === 'announcement') {
                refetchAnnouncement();
              }
            }} // 엔터 키 입력 시 검색 실행
            onBlur={() => {
              console.log('키보드 내림 - 검색 실행:', keyword);
              if (type === 'space') {
                refetchSpace();
              } else if (type === 'announcement') {
                refetchAnnouncement();
              }
            }} // 키보드가 내려갈 때 검색 실행
            className="border p-2 rounded"
          />

          {type === 'space' && searchedSpace !== undefined && (
            <FlatList
              // 렌더링하는 전체 데이터
              data={searchedSpace.pages.flatMap((page) => page.content)}
              // 각 아이템의 key 값 지정
              keyExtractor={(item) => item.id.toString()}
              // 아이템들을 렌더링하는 메서드
              renderItem={({ item }) => (
                <View className="px-5">
                  <CardComponent spaceData={item} toggleLike={spaceLike} />
                </View>
              )}
              // FlatList의 최하단에 렌더링되는 Footer 아이템
              ListFooterComponent={<View className="h-16" />}
              // 렌더링 되는 아이템들 사이의 간격
              ItemSeparatorComponent={() => <View className="h-4" />}
              onEndReached={() => {
                if (hasSpaceNextPage) {
                  fetchSpaceNextPage();
                }
              }}
            />
          )}

          {type === 'announcement' && searchedAnnouncement !== undefined && (
            <FlatList
              // 렌더링하는 전체 데이터
              data={searchedAnnouncement.pages.flatMap((page) => page.content)}
              // 각 아이템의 key 값 지정
              keyExtractor={(item) => item.id.toString()}
              // 아이템들을 렌더링하는 메서드
              renderItem={({ item }) => (
                <View className="px-5">
                  <RecruitItemComponent recruitItem={item} toggleLike={announcementLike} />
                </View>
              )}
              // FlatList의 최하단에 렌더링되는 Footer 아이템
              ListFooterComponent={<View className="h-16" />}
              // 렌더링 되는 아이템들 사이의 간격
              ItemSeparatorComponent={() => <View className="h-4" />}
              onEndReached={() => {
                if (hasAnnouncementNextPage) {
                  fetchAnnouncementNextPage();
                }
              }}
            />
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Suspense>
  );
};

export default SearchScreen;
