import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

export default function SpaceSkeletonItem() {
  return (
    <View className="border border-stroke rounded-lg mx-[20px] bg-white">
      <ContentLoader
        speed={2}
        width={Dimensions.get('screen').width - 40}
        height={336}
        backgroundColor="#ecebeb"
        foregroundColor="#f3f3f3"
      >
        {/* 상단 이미지 */}
        <Rect x="0" y="0" rx="8" ry="8" width={Dimensions.get('screen').width - 40} height="188" />

        {/* 주소 */}
        <Rect x="16" y="196" rx="4" ry="4" width="120" height="20" />
        {/* 이름 */}
        <Rect x="16" y="218" rx="4" ry="4" width="180" height="28" />
        {/* 사이즈 */}
        <Rect x="16" y="250" rx="4" ry="4" width="60" height="18" />

        {/* 가격 영역 */}
        <Rect
          x={Dimensions.get('screen').width - 40 - 100}
          y="270"
          rx="4"
          ry="4"
          width="80"
          height="20"
        />
        <Rect
          x={Dimensions.get('screen').width - 40 - 140}
          y="292"
          rx="4"
          ry="4"
          width="120"
          height="28"
        />
      </ContentLoader>
    </View>
  );
}
