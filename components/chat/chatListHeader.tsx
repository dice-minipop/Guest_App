import { Text, View } from 'react-native';

import ChatIcon from '@/assets/icons/chat/chat.svg';

const ChatListHeaderComponent: React.FC = () => {
  return (
    <View className="bg-white flex flex-col gap-y-[24px] pt-[32px] pb-[24px]">
      <View className="flex flex-row items-center gap-x-[8px] px-[20px]">
        <Text className="H1 text-black">호스트와의 쪽지함</Text>
        <ChatIcon />
      </View>

      <View className="bg-stroke h-[1px]" />
    </View>
  );
};

export default ChatListHeaderComponent;
