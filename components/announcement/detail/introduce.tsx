import { Text, View } from 'react-native';

import { AnnouncementDetailComponentProps } from '@/types/announcement';

export default function AnnouncementIntroduceComponent({ data }: AnnouncementDetailComponentProps) {
  return (
    <View className="gap-[16px] px-[20px]">
      <Text className="SUB2 text-black">지원 공고 소개</Text>
      <Text className="BODY1 text-deep_gray">{data.details}</Text>
    </View>
  );
}
