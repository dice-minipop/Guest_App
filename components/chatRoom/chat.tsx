import React from 'react';
import { Text, View } from 'react-native';

import { ChatItem } from '@/constants/mocks/chatDummyData';

interface ChatComponentProps {
  chatData: ChatItem;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ chatData }) => {
  return (
    <View
      className={`max-w-[244px] rounded-lg px-3 py-2 ${
        chatData.isMe ? 'self-end bg-dark_gray' : 'self-start border border-stroke bg-white'
      }`}
    >
      <Text
        className={`font-BODY1 text-BODY1 leading-BODY1 ${
          chatData.isMe ? 'text-white' : 'text-deep_gray'
        }`}
      >
        {chatData.content}
      </Text>
    </View>
  );
};

export default ChatComponent;
