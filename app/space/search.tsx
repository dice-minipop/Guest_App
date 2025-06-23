import { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MagnifierIcon from '@/assets/icons/magnifier.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import SpaceItemComponent from '@/components/common/spaceItem';
import { useGetSearchedSpaceLists } from '@/hooks/space/space';
import { useDebounce } from '@/hooks/useDebounce';

export default function SpaceSearch() {
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounce(keyword, 300);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { data, hasNextPage, fetchNextPage } = useGetSearchedSpaceLists(debouncedKeyword);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" hasSafeArea={false} />
      <View
        className={`bg-white flex flex-row items-center gap-x-[4px] px-[13px] pt-[13px] pb-[14px] rounded-lg mt-[12px] mx-[20px] border ${isFocused ? 'border-black' : 'border-stroke'}`}
      >
        <MagnifierIcon />
        <TextInput
          value={keyword}
          onChangeText={(e: string) => setKeyword(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="검색어를 입력해주세요"
          placeholderTextColor="#CCCCCC"
          className="flex-1"
        />
      </View>

      <FlatList
        contentContainerStyle={{ flex: 1, rowGap: 16, marginTop: 16 }}
        data={data?.pages?.flatMap((page) => page.content)}
        renderItem={({ item }) => <SpaceItemComponent key={item.id} data={item} />}
        ListEmptyComponent={() => (
          <View className="flex-1 flex justify-center items-center">
            <Text className="BODY1 text-deep_gray text-center mb-[40px]">
              {keyword !== '' ? '검색 결과가 없어요' : '검색어를 입력해주세요'}
            </Text>
          </View>
        )}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />
    </SafeAreaView>
  );
}
