import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View, Image } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface ChatRoom {
  chatRoomId: number;
  name: string;
  createdAt: string;
  lastContent: string;
  notReadCount: number;
  storeImage: string;
  adminImage: string;
}

interface ChatRoomComponentProps {
  chatRoomData: ChatRoom;
  handleExitModal: (chatRoomId: number) => void;
}

const ChatRoomComponent: React.FC<ChatRoomComponentProps> = ({ chatRoomData, handleExitModal }) => {
  const router = useRouter();

  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 74 }],
      };
    });

    return (
      <Reanimated.View style={styleAnimation}>
        <Pressable onPress={() => handleExitModal(chatRoomData.chatRoomId)}>
          <View className="flex h-full w-[74px] items-center justify-center bg-red">
            <Text className="text-center font-SUB3 text-SUB3 leading-SUB3 text-white">나가기</Text>
          </View>
        </Pressable>
      </Reanimated.View>
    );
  }

  return (
    <ReanimatedSwipeable renderRightActions={RightAction} overshootRight={false}>
      <Pressable onPress={() => router.push(`/chatRoom/${chatRoomData.chatRoomId}`)}>
        <View className="flex flex-row justify-between px-5 py-[15.5px]">
          <View className="flex flex-row">
            <View className="relative mr-3">
              <Image
                source={{ uri: chatRoomData.storeImage }}
                className="h-[50px] w-[50px] rounded-lg"
              />

              <Image
                source={{ uri: chatRoomData.adminImage }}
                className="absolute -bottom-2 -right-2 h-8 w-8"
              />
            </View>

            <View>
              <Text className="font-SUB3 text-SUB3 leading-SUB3 text-dark_gray">
                {chatRoomData.name}
              </Text>
              <Text className="font-BODY2 text-BODY2 leading-BODY2 text-medium_gray">
                {chatRoomData.lastContent}
              </Text>
            </View>
          </View>

          <View className="flex flex-col items-end justify-between">
            <Text className="font-CAP2 text-CAP2 leading-CAP2 text-light_gray">
              {chatRoomData.createdAt}
            </Text>

            {chatRoomData.notReadCount !== 0 && (
              <View className="rounded-full bg-red px-1.5 py-1">
                <Text className="font-CAP2 text-CAP2 leading-CAP2 text-white">
                  {chatRoomData.notReadCount > 999 ? '999+' : chatRoomData.notReadCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </ReanimatedSwipeable>
  );
};

export default ChatRoomComponent;
