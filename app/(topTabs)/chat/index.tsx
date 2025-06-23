import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatIcon from '@/assets/icons/chat/chat.svg';
import ChatListHeaderComponent from '@/components/chat/chatListHeader';
import ChatRoomItemComponent from '@/components/chat/chatRoomItem';
import BackHeaderComponent from '@/components/common/backHeader';
import { useGetMessageLists } from '@/hooks/message/message';

export default function ChatList() {
  // const { data } = useGetMessageLists();

  const data = [
    {
      id: 1,
      spaceName: '이름이름이름이름이름이름이름이름이름이름이름이름',
      spaceImage: 'https://picsum.photos/250/250',
      lastMessage:
        '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
      lastMessageAt: '오전 10시',
      unreadCount: 10,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" hasSafeArea={false} />

      <FlatList
        contentContainerStyle={{ flex: 1, paddingBottom: 64 }}
        data={data}
        ListHeaderComponent={() => <ChatListHeaderComponent />}
        stickyHeaderIndices={[0]}
        renderItem={({ item }) => <ChatRoomItemComponent key={item.id} data={item} />}
        ItemSeparatorComponent={() => <View className="h-[12px]" />}
        ListEmptyComponent={() => (
          <View className="flex-1 flex justify-center items-center">
            <Text className="BODY1 text-deep_gray text-center">아직 주고받은 쪽지가 없어요</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
