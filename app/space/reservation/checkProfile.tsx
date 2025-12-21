import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import { useGetGuestInfo } from '@/hooks/guest/guest';

export default function ReservationCheckProfile() {
  const router = useRouter();

  const { data } = useGetGuestInfo();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" title="예약 신청" hasSafeArea={false} />

      <ScrollView
        className="flex-1 px-[20px]"
        contentContainerStyle={{ rowGap: 24, paddingBottom: 80 }}
      >
        <View className="gap-y-[8px] pt-[32px] pb-[8px]">
          <Text className="H2 text-black">브랜드 프로필을 확인해주세요</Text>
          <Text className="SUB3 text-deep_gray">해당 브랜드 프로필로 공간 예약이 신청되어요</Text>
        </View>

        <View className="gap-y-[8px]">
          <Text className="CAP1 text-dark_gray">브랜드 이름</Text>
          <Text className="H1 text-black">
            {data.brandList.length !== 0 ? data.brandList[0].name : `${data.name}님의 브랜드`}
          </Text>
        </View>

        <View className="gap-y-[8px]">
          <Text className="CAP1 text-dark_gray">브랜드 소개</Text>
          <Text className="BODY2 text-deep_gray">
            {data.brandList.length !== 0
              ? data.brandList[0].description
              : '등록된 브랜드 소개가 없습니다.'}
          </Text>
        </View>

        <View className="gap-y-[8px]">
          <Text className="CAP1 text-dark_gray">브랜드, 상품 관련 이미지</Text>
          {data.brandList.length !== 0 ? (
            <FlatList
              contentContainerStyle={{ columnGap: 6 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={data.brandList[0].imageUrls}
              renderItem={({ item }) => (
                <Image
                  key={item}
                  source={item}
                  style={{ width: 80, height: 80, borderRadius: 12 }}
                />
              )}
            />
          ) : (
            <Text>등록된 브랜드, 상품 관련 이미지가 없습니다.</Text>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.push('/space/reservation/inputInformation')}
        className="bg-black my-[16px] py-[15.5px] mx-[20px] rounded-lg"
      >
        <Text className="BTN1 text-white text-center">다음</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
