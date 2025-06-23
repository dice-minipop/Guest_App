import { Pressable, Text, View } from 'react-native';

import ChatIcon from '@/assets/icons/notification/chat.svg';
import NotificationIcon from '@/assets/icons/notification/notification.svg';
import { NotificationItem } from '@/types/notification';

interface NotificationItemComponentProps {
  data: NotificationItem;
}

const NotificationItemComponent: React.FC<NotificationItemComponentProps> = ({ data }) => {
  return (
    <Pressable className={`flex flex-row gap-x-2 px-5 py-4 ${!data.isRead && 'bg-back_gray'}`}>
      <View>
        {data.type === '호스트 쪽지' && <ChatIcon />}
        {data.type === '팝업공간 예약' && <NotificationIcon />}
      </View>

      <View className="flex flex-col gap-y-1 flex-1">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-CAP1 font-CAP1 leading-CAP1 text-deep_gray">{data.type}</Text>
          <Text className="text-CAP1 font-CAP1 leading-CAP1 text-medium_gray">
            {data.createdAt}
          </Text>
        </View>
        <Text className="text-BODY1 font-BODY1 leading-BODY1 text-dark_gray">{data.content}</Text>
      </View>
    </Pressable>
  );
};

export default NotificationItemComponent;
