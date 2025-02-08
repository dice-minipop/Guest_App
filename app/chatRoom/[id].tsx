import React, { useState } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

import ChatComponent from '@/components/chatRoom/chat';
import HeaderComponent from '@/components/chatRoom/header';
import FooterComponent from '@/components/chatRoom/footer';

import { useLocalSearchParams } from 'expo-router';
import { dummyData } from '@/constants/mocks/chatDummyData';

const ChatRoomScreen = () => {
  const { id } = useLocalSearchParams();

  const [chatData] = useState(dummyData);

  return (
    <SafeAreaView className={`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1">
          <FlatList
            className="bg-back_gray"
            bounces={false}
            stickyHeaderIndices={[0]}
            // 렌더링하는 전체 데이터
            data={chatData}
            // 각 아이템의 key 값 지정
            keyExtractor={(item) => item.id.toString()}
            // 아이템들을 렌더링하는 메서드
            renderItem={({ item }) => (
              <View className="px-5">
                <ChatComponent chatData={item} />
              </View>
            )}
            // FlatList의 최상단에 렌더링되는 Header 아이템
            ListHeaderComponent={<HeaderComponent />}
            // FlatList의 최하단에 렌더링되는 Footer 아이템
            // ListFooterComponent={<FooterComponent />}
            // 렌더링 되는 아이템들 사이의 간격
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </View>

        <FooterComponent />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
