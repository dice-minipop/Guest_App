import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CoverViewComponent from '@/components/common/coverView';
import BrandInfoComponent from '@/components/myPage/brandInfo';
import MenuContainer from '@/components/myPage/menuContainer';

export default function MyPage() {
  const { top } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <View style={{ height: top, backgroundColor: '#000000' }} />

      <CoverViewComponent height={500} top={-100} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFFFFF', paddingBottom: 64 }}
      >
        <BrandInfoComponent />
        <MenuContainer />
      </ScrollView>
    </View>
  );
}
