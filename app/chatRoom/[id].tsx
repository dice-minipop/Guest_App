import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, Text } from 'react-native';

import ChatComponent from '@/components/chatRoom/chat';
import FooterComponent from '@/components/chatRoom/footer';
import HeaderComponent from '@/components/chatRoom/header';
import ReportModalComponent from '@/components/chatRoom/reportModal';
import { useGetMessageDetailData } from '@/hooks/message/message';
import { useSpaceDataStore } from '@/zustands/space/store';

const ChatRoomScreen = () => {
  const { id } = useLocalSearchParams();
  const { spaceName } = useSpaceDataStore();

  const { data, fetchNextPage, hasNextPage } = useGetMessageDetailData(Number(id));

  const messages = data.pages.flatMap((page) => page.content);

  const [isReportModalVisible, setIsReportModalVisible] = useState<boolean>(false);

  return (
    <SafeAreaView className={`flex-1 bg-white`}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 bg-back_gray">
          <FlatList
            bounces={false}
            stickyHeaderIndices={[0]}
            // 렌더링하는 전체 데이터
            data={[
              { id: 'notice', type: 'notice' }, // 공지 메시지를 첫 번째 아이템으로 추가
              ...messages,
            ]}
            // 각 아이템의 key 값 지정
            keyExtractor={(item) => (item.id === 'notice' ? 'notice' : item.id.toString())}
            // 아이템들을 렌더링하는 메서드
            renderItem={({ item, index }) => {
              if (item.type === 'notice') {
                return (
                  <View className="bg-white p-4 rounded-lg my-6 mx-5">
                    <Text className="text-CAP1 font-CAP1 leading-CAP1 text-deep_gray text-center">
                      ‘{spaceName}’ 담당자님과의 쪽지가 시작되었습니다. 불필요한 비방과 부적절한
                      언행은 제재 대상이 될 수 있습니다.
                    </Text>
                  </View>
                );
              }

              const messageIndex = messages.findIndex((msg) => msg.id === item.id);
              const previousItem = messageIndex > 0 ? messages[messageIndex - 1] : null;

              if ('createdAt' in item) {
                const currentTime = dayjs(item.createdAt);
                const previousTime =
                  previousItem && 'createdAt' in previousItem
                    ? dayjs(previousItem.createdAt)
                    : null;

                const isSameDate = previousTime && currentTime.isSame(previousTime, 'day');
                const isSameTime =
                  previousTime &&
                  currentTime.isSame(previousTime, 'hour') &&
                  currentTime.minute() === previousTime.minute();

                const isFirstItem = !isSameDate || !isSameTime;
                const isLastMessageWithSameTime =
                  previousItem &&
                  'createdAt' in previousItem &&
                  dayjs(previousItem.createdAt).isSame(currentTime, 'minute');

                return (
                  <View className="px-5">
                    <ChatComponent
                      chatData={item}
                      isSameDate={isSameDate}
                      isFirstItem={isFirstItem}
                      isLastMessageWithSameTime={isLastMessageWithSameTime}
                    />
                  </View>
                );
              }

              return null;
            }}
            // FlatList의 최상단에 렌더링되는 Header 아이템
            ListHeaderComponent={
              <HeaderComponent openReportModal={() => setIsReportModalVisible(true)} />
            }
            // FlatList의 최하단에 렌더링되는 Footer 아이템
            ListFooterComponent={<View className="h-16" />}
            // 렌더링 되는 아이템들 사이의 간격
            ItemSeparatorComponent={() => <View className="h-3" />}
            onEndReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
          />
        </View>
        <FooterComponent />
      </KeyboardAvoidingView>

      <ReportModalComponent
        isVisible={isReportModalVisible}
        chatRoomId={Number(id)}
        spaceName={spaceName}
        closeModal={() => setIsReportModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
