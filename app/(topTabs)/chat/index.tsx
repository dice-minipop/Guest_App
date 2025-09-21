import { StatusBar } from 'expo-status-bar';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatListHeaderComponent from '@/components/chat/chatListHeader';
import ChatRoomItemComponent from '@/components/chat/chatRoomItem';
import BackHeaderComponent from '@/components/common/backHeader';
import { useGetMessageLists } from '@/hooks/message/message';

export default function ChatList() {
  const { data, isLoading, isError } = useGetMessageLists();
  const chatRoomData = data || [];

  if (isError) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <BackHeaderComponent style="WHITE" hasSafeArea={false} />

        <View className="flex-1 justify-center items-center">
          <Text className="BODY1 text-red">잘못된 요청입니다!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <BackHeaderComponent style="WHITE" hasSafeArea={false} />

      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 64 }}
        data={isLoading ? Array.from({ length: 3 }).map(() => null) : chatRoomData}
        ListHeaderComponent={() => <ChatListHeaderComponent />}
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) =>
          item ? (
            <ChatRoomItemComponent key={item.id} data={item} />
          ) : (
            <ChatRoomSkeleton key={index} />
          )
        }
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

const ChatRoomSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={Dimensions.get('screen').width - 40}
      height={80}
      backgroundColor="#ecebeb"
      foregroundColor="#f3f3f3"
    >
      {/* 주소 */}
      <Rect x="20" y="15" rx="8" ry="8" width="50" height="50" />

      {/* 이름 */}
      <Rect x="82" y="15" rx="4" ry="4" width="200" height="27" />
      {/* 사이즈 */}
      <Rect x="82" y="44" rx="4" ry="4" width="200" height="22" />
    </ContentLoader>
  );
};
