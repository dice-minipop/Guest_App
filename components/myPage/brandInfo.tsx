import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';

import EditIcon from '@/assets/icons/myPage/edit.svg';
import { useGetMyBrandInfo } from '@/hooks/brand/brand';

export default function BrandInfoComponent() {
  const router = useRouter();

  const { data, isFetching } = useGetMyBrandInfo();

  return isFetching ? (
    <BrandInfoSkeleton />
  ) : (
    <View className="bg-black pt-[4px] pl-[20px] pb-[16px]">
      <TouchableOpacity
        onPress={() => router.push('/myPage/management/brand')}
        className="p-[12px] mb-[4px] mr-[6px] self-end"
      >
        <EditIcon />
      </TouchableOpacity>

      <View className="gap-y-[16px]">
        <Text numberOfLines={2} ellipsizeMode="tail" className="H1 text-white mr-[20px]">
          {data && data.length !== 0 ? data[0].name : '브랜드 프로필을 작성해주세요'}
        </Text>
        <Text numberOfLines={2} ellipsizeMode="tail" className="BODY2 text-light_gray mr-[20px]">
          {data && data.length !== 0
            ? data[0].description
            : '팝업 공간을 대여해주는 호스트와 신뢰할 수 있는 거래를 위해 브랜드를 1~2문장으로 짧게 설명해주세요'}
        </Text>

        <FlatList
          data={
            data && data.length !== 0 && data[0].imageUrls.length !== 0
              ? data[0].imageUrls
              : Array.from({ length: 5 }, (_, i) => `item${i}`)
          }
          contentContainerStyle={{ columnGap: 4, paddingRight: 20 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={
                data && data.length !== 0 && data[0].imageUrls.length !== 0
                  ? { uri: item }
                  : require('@/assets/image/emptyImage.png')
              }
              style={{ width: 80, height: 80, borderRadius: 12 }}
            />
          )}
          horizontal={true}
        />
      </View>
    </View>
  );
}

const BrandInfoSkeleton = () => {
  return (
    <View className="bg-black">
      <ContentLoader
        speed={2}
        width={Dimensions.get('screen').width}
        height={257}
        backgroundColor="#ecebeb"
        foregroundColor="#f3f3f3"
      >
        {/* 브랜드 이름 */}
        <Rect x="20" y="56" rx="4" ry="4" width="120" height="29" />

        {/* 브랜드 소개 */}
        <Rect
          x="20"
          y="101"
          rx="4"
          ry="4"
          width={Dimensions.get('screen').width - 40}
          height="44"
        />

        {/* 이미지 */}
        <Rect x="20" y="161" rx="12" ry="12" width="80" height="80" />
        <Rect x="104" y="161" rx="12" ry="12" width="80" height="80" />
        <Rect x="188" y="161" rx="12" ry="12" width="80" height="80" />
        <Rect x="272" y="161" rx="12" ry="12" width="80" height="80" />
        <Rect x="356" y="161" rx="12" ry="12" width="80" height="80" />
      </ContentLoader>
    </View>
  );
};
