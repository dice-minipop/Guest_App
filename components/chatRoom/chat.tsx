import dayjs from 'dayjs';
import React from 'react';
import { Text, View } from 'react-native';

import { MessageData } from '@/server/message/response';

interface ChatComponentProps {
  chatData: MessageData;
  isSameDate: boolean | null;
  isFirstItem: boolean;
  isLastMessageWithSameTime: boolean | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  chatData,
  isSameDate,
  isFirstItem,
  isLastMessageWithSameTime,
}) => {
  const formattedDate = dayjs(chatData.createdAt).format('YYYY년 M월 D일');
  const currentTime = dayjs(chatData.createdAt).format('A h:mm');

  return (
    <>
      {isFirstItem && !isSameDate && (
        <Text className="text-center text-CAP2 font-CAP2 leading-CAP2 text-dark_gray py-2">
          {formattedDate}
        </Text>
      )}

      {!isLastMessageWithSameTime && (
        <Text
          className={`text-CAP1 font-CAP1 leading-CAP1 text-medium_gray ${chatData.isLoginUsersMessage ? 'self-end' : 'self-start'} mb-1`}
        >
          {currentTime}
        </Text>
      )}

      {!chatData.isLoginUsersMessage && !isLastMessageWithSameTime && (
        <Text
          className={`text-CAP1 font-CAP1 leading-CAP1 text-medium_gray ${chatData.isLoginUsersMessage ? 'self-end' : 'self-start'} mb-1`}
        >
          {chatData.senderName} · 호스트 {currentTime}
        </Text>
      )}

      {!chatData.isLoginUsersMessage && isLastMessageWithSameTime && (
        <Text
          className={`text-CAP1 font-CAP1 leading-CAP1 text-medium_gray ${chatData.isLoginUsersMessage ? 'self-end' : 'self-start'} mb-1`}
        >
          {chatData.senderName} · 호스트
        </Text>
      )}

      <View
        className={`max-w-[244px] rounded-lg px-3 py-2 ${
          chatData.isLoginUsersMessage
            ? 'self-end bg-dark_gray rounded-tr-none'
            : 'self-start border border-stroke bg-white rounded-tl-none'
        }`}
      >
        <Text
          className={`font-BODY1 text-BODY1 leading-BODY1 ${chatData.isLoginUsersMessage ? 'text-white' : 'text-deep_gray'}`}
        >
          {chatData.content}
        </Text>
      </View>
    </>
  );
};

export default ChatComponent;
