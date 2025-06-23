import { Text, View } from 'react-native';

import { SpaceDetailComponentProps } from '@/types/space';

const SpaceNoticeComponent: React.FC<SpaceDetailComponentProps> = ({ data }) => {
  return (
    <View className="gap-y-[16px] px-[20px]">
      <Text className="SUB2 text-black">공지사항 안내</Text>
      <View className="bg-back_gray rounded-lg p-[16px]">
        <Text className="BODY1 text-deep_gray">* {data.notice}</Text>
      </View>
    </View>
  );
};

export default SpaceNoticeComponent;
