import { useRouter } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

import MagnifierIcon from '@/assets/icons/magnifier.svg';

import OpacityPressable from '../common/opacityPressable';

const HeaderComponent: React.FC = () => {
  const router = useRouter();

  return (
    <View className="gap-y-[16px]">
      <View className="px-[20px] pb-[20px] bg-black">
        <OpacityPressable
          onPress={() => router.push(`/space/search`)}
          className="bg-white flex flex-row items-center gap-x-[4px] px-[13px] pt-[13px] pb-[14px] rounded-lg"
        >
          <MagnifierIcon />
          <Text className="BODY2 text-medium_gray">찾은 지역이나 지하철역으로 검색해보세요</Text>
        </OpacityPressable>
      </View>

      {/* <View className="pl-[20px] gap-y-[8px]">
        <Text className="SUB2">20대 여성이 많이 오는 동네 Top10</Text>
        <FlatList
          data={[
            '성수2가1동',
            '성수2가1동',
            '성수2가1동',
            '성수2가1동',
            '성수2가1동',
            '성수2가1동',
            '성수2가1동',
            '성수2가1동',
            '성수2가1동',
            '성수2가1동',
          ]}
          renderItem={({ item }) => (
            <View className="w-[64px] h-[72px] bg-black flex justify-center items-center">
              <Text className="BTN2 text-white">{item}</Text>
            </View>
          )}
          contentContainerStyle={{ columnGap: 4, paddingRight: 20 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
      </View> */}

      <View className="px-[20px] mt-[8px]">
        <Text className="SUB2 text-black">다이스 추천 팝업 공간</Text>
      </View>
    </View>
  );
};

export default HeaderComponent;
