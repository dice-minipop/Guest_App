import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, View, Text } from 'react-native';

export default function ReservationSkeletonItem() {
  return (
    <View className="border border-stroke rounded-lg mx-[20px] bg-white relative">
      <ContentLoader
        speed={2}
        width={Dimensions.get('screen').width - 40}
        height={296}
        backgroundColor="#ecebeb"
        foregroundColor="#f3f3f3"
      >
        {/* 공간 주소 */}
        <Rect x="16" y="24" rx="4" ry="4" width="100" height="20" />
        {/* 공간 이름 */}
        <Rect x="16" y="46" rx="4" ry="4" width="150" height="31" />
        {/* 면적 */}
        <Rect x="16" y="85" rx="4" ry="4" width="120" height="20" />

        {/* 이미지 */}
        <Rect x="199" y="16" rx="12" ry="12" width="120" height="120" />

        {/* 대여 기간 */}
        <Rect
          x={Dimensions.get('screen').width - 198}
          y="160"
          rx="4"
          ry="4"
          width="142"
          height="20"
        />
        {/* 총 대여 금액 */}
        <Rect
          x={Dimensions.get('screen').width - 168}
          y="184"
          rx="4"
          ry="4"
          width="112"
          height="28"
        />

        {/* 버튼 */}
        <Rect
          x="16"
          y="228"
          rx="8"
          ry="8"
          width={Dimensions.get('screen').width - 72}
          height="52"
        />
      </ContentLoader>

      {/* 텍스트를 ContentLoader 위에 올리기 위해 absolute 배치 */}
      <Text className="CAP1 text-semiLight_gray absolute left-[16px] top-[160px]">대여 기간</Text>
      <Text className="CAP1 text-semiLight_gray absolute left-[16px] top-[188px]">
        총 대여 금액
      </Text>
    </View>
  );
}
