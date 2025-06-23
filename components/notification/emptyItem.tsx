import { Text, View } from 'react-native';

import GrayNotificationIcon from '@/assets/icons/notification/gray-notification.svg';

const EmptyItemComponent: React.FC = () => {
  return (
    <View className="flex-1 flex flex-row justify-center items-center gap-x-[8px] bg-white pb-[80px]">
      <GrayNotificationIcon />
      <Text className="BODY1 text-medium_gray">현재는 받은 알림이 없어요.</Text>
    </View>
  );
};

export default EmptyItemComponent;
