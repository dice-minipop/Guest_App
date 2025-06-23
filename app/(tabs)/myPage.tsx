import { Dimensions, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import CoverViewComponent from '@/components/common/coverView';
import BrandInfoComponent from '@/components/myPage/brandInfo';
import MenuContainer from '@/components/myPage/menuContainer';
import { useGetMyBrandInfo } from '@/hooks/brand/brand';

export default function MyPage() {
  const { top } = useSafeAreaInsets();

  // const { data } = useGetMyBrandInfo();

  const data = [
    {
      id: 1,
      name: '이름이름이름이름이름이름이름이름이름이름이름이름이름이름이름이름이름이름이름이름',
      description:
        '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
      logoUrl: '',
      // imageUrls: ['https://picsum.photos/250/250'],
      imageUrls: [],
      homepageUrl: '',
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <View style={{ height: top, backgroundColor: '#000000' }} />
      <CoverViewComponent height={500} top={-100} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFFFFF', paddingBottom: 64 }}
      >
        <BrandInfoComponent data={data} />
        <MenuContainer />
      </ScrollView>
    </View>
  );
}
