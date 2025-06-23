import { Text, View } from 'react-native';

import { AnnouncementDetailComponentProps } from '@/types/announcement';

const AnnouncementIntroduceComponent: React.FC<AnnouncementDetailComponentProps> = ({ data }) => {
  return (
    <View className="gap-[16px] px-[20px]">
      <Text className="SUB2 text-black">지원 공고 소개</Text>
      <Text className="BODY1 text-deep_gray">{data.details}</Text>
    </View>
  );
};

export default AnnouncementIntroduceComponent;
