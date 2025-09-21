import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

export default function AnnouncementSkeletonItem() {
  return (
    <View className="border border-stroke rounded-lg mx-[20px] bg-white">
      <ContentLoader
        speed={2}
        width={Dimensions.get('screen').width - 40}
        height={134}
        backgroundColor="#ecebeb"
        foregroundColor="#f3f3f3"
      >
        {/* 주소 */}
        <Rect x="16" y="16" rx="4" ry="4" width="120" height="20" />
        {/* 이름 */}
        <Rect x="16" y="38" rx="4" ry="4" width="260" height="56" />
        {/* 사이즈 */}
        <Rect x="16" y="104" rx="4" ry="4" width="300" height="18" />
      </ContentLoader>
    </View>
  );
}
