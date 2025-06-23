import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, Text } from 'react-native';

import EditIcon from '@/assets/icons/myPage/edit.svg';
import { BrandInfo } from '@/server/brand/response';

interface BrandInfoComponentProps {
  data: BrandInfo[];
}

const BrandInfoComponent: React.FC<BrandInfoComponentProps> = ({ data }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => (data.length !== 0 ? undefined : router.push('/myPage/management/brand'))}
      className="bg-black gap-y-[16px] pt-[4px] pl-[20px] pb-[16px]"
    >
      <Pressable
        onPress={() => router.push('/myPage/management/brand')}
        className="p-[12px] mb-[4px] mr-[6px] self-end"
      >
        <EditIcon />
      </Pressable>

      <Text numberOfLines={2} ellipsizeMode="tail" className="H1 text-white mr-[20px]">
        {data.length !== 0 ? data[0].name : '브랜드 프로필을 작성해주세요'}
      </Text>
      <Text numberOfLines={2} ellipsizeMode="tail" className="BODY2 text-light_gray mr-[20px]">
        {data.length !== 0
          ? data[0].description
          : '팝업 공간을 대여해주는 호스트와 신뢰할 수 있는 거래를 위해 브랜드를 1~2문장으로 짧게 설명해주세요'}
      </Text>

      <FlatList
        data={
          data.length !== 0 && data[0].imageUrls.length !== 0
            ? data[0].imageUrls
            : Array.from({ length: 5 }, (_, i) => `item${i}`)
        }
        contentContainerStyle={{ columnGap: 4, paddingRight: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={
              data.length !== 0 && data[0].imageUrls.length !== 0
                ? { uri: item }
                : require('@/assets/image/emptyImage.png')
            }
            style={{ width: 80, height: 80, borderRadius: 12 }}
          />
        )}
        horizontal={true}
      />
    </Pressable>
  );
};

export default BrandInfoComponent;
