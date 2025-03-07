import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View, Image } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
// import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { useSpaceDataStore } from '@/zustands/space/store';

interface ChatRoom {
  id: number;
  spaceName: string;
  spaceImage: string;
  lastMessage: string;
  lastMessageAt: string | null;
  unreadCount: number;
  // adminImage: string;
}

interface ChatRoomComponentProps {
  chatRoomData: ChatRoom;
  handleExitModal: (chatRoomId: number) => void;
}

const ChatRoomComponent: React.FC<ChatRoomComponentProps> = ({ chatRoomData, handleExitModal }) => {
  const router = useRouter();

  const { setSpaceName } = useSpaceDataStore();

  const formatDate = (isoString: string | null) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });
  };

  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 74 }],
      };
    });

    return (
      <Reanimated.View style={styleAnimation}>
        <Pressable onPress={() => handleExitModal(chatRoomData.id)}>
          <View className="flex h-full w-[74px] items-center justify-center bg-red">
            <Text className="text-center font-SUB3 text-SUB3 leading-SUB3 text-white">나가기</Text>
          </View>
        </Pressable>
      </Reanimated.View>
    );
  }

  return (
    // <ReanimatedSwipeable renderRightActions={RightAction} overshootRight={false}>
    <Pressable
      onPress={() => {
        router.push(`/chatRoom/${chatRoomData.id}`);
        setSpaceName(chatRoomData.spaceName);
      }}
    >
      <View className="flex flex-row justify-between px-5 py-[15.5px]">
        <View className="flex flex-row">
          <View className="relative mr-3">
            <Image
              source={{ uri: chatRoomData.spaceImage }}
              className="h-[50px] w-[50px] rounded-lg"
            />

            {/* <Image
                source={{ uri: chatRoomData.adminImage }}
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              /> */}
          </View>

          <View>
            <Text className="font-SUB3 text-SUB3 leading-SUB3 text-dark_gray">
              {chatRoomData.spaceName}
            </Text>
            <Text className="font-BODY2 text-BODY2 leading-BODY2 text-medium_gray">
              {chatRoomData.lastMessage !== '' ? chatRoomData.lastMessage : '대화내용이 없습니다'}
            </Text>
          </View>
        </View>

        <View className="flex flex-col items-end justify-between">
          <Text className="font-CAP2 text-CAP2 leading-CAP2 text-light_gray">
            {formatDate(chatRoomData.lastMessageAt)}
          </Text>

          {chatRoomData.unreadCount !== 0 && (
            <View className="rounded-full bg-red min-w-[18px] min-h-[18px] flex items-center justify-center">
              <Text className="font-CAP2 text-CAP2 leading-CAP2 text-white px-1.5 py-1">
                {chatRoomData.unreadCount > 999 ? '999+' : chatRoomData.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
    // </ReanimatedSwipeable>
  );
};

export default ChatRoomComponent;
