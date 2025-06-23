import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ChatRoomItem } from '@/types/chat';

interface ChatRoomItemComponentProps {
  data: ChatRoomItem;
}

const ChatRoomItemComponent: React.FC<ChatRoomItemComponentProps> = ({ data }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push(`/chat/${data.id}?spaceName=${encodeURIComponent(data.spaceName as string)}`)
      }
      className="flex flex-row items-center gap-x-[12px] py-[15px] mx-[20px]"
    >
      <Image source={data.spaceImage} style={{ width: 50, height: 50, borderRadius: 8 }} />

      <View className="flex-1 flex flex-row justify-between gap-x-[4px]">
        <View className="flex-1 flex flex-col">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="max-w-[200px] SUB3 text-dark_gray"
          >
            {data.spaceName}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" className="BODY2 text-medium_gray">
            {data.lastMessage}
          </Text>
        </View>

        <View className="flex flex-col items-end justify-between">
          <Text className="CAP2 text-light_gray">{data.lastMessageAt}</Text>
          {data.unreadCount !== 0 && (
            <View className="bg-red px-[6px] rounded-full h-[18px]">
              <Text className="CAP2 text-white">{data.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ChatRoomItemComponent;
