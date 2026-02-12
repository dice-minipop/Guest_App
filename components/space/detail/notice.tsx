import { Text, View } from 'react-native';

import { SpaceDetailComponentProps } from '@/types/space';

export default function SpaceNoticeComponent({ data }: SpaceDetailComponentProps) {
  return (
    <View className="gap-y-[16px] px-[20px]">
      <Text className="SUB2 text-black">공지사항 안내</Text>
      <View className="bg-back_gray rounded-lg p-[16px]">
        {data.notices.map((notice, index) => (
          <Text key={index} className="BODY1 text-deep_gray">
            * {notice}
          </Text>
        ))}
      </View>
    </View>
  );
}
