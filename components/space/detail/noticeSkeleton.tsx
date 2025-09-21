import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, Text, View } from 'react-native';

export default function SpaceNoticeSkeleton() {
  return (
    <View className="gap-y-[16px] px-[20px]">
      <Text className="SUB2 text-black">공지사항 안내</Text>
      <ContentLoader
        speed={2}
        width={Dimensions.get('screen').width - 40}
        height={108}
        backgroundColor="#ecebeb"
        foregroundColor="#f3f3f3"
      >
        <Rect x="0" y="0" rx="8" ry="8" width={Dimensions.get('screen').width - 40} height="108" />
      </ContentLoader>
    </View>
  );
}
