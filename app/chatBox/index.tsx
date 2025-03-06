import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, FlatList, SafeAreaView, Platform } from 'react-native';

import ChatRoomComponent from '@/components/chatBox/chatRoom';
import HeaderComponent from '@/components/chatBox/header';
import CustomTwoBtnModal from '@/components/common/customTwoBtnModal';
import { dummyData } from '@/constants/mocks/chatBoxDummyData';
import { useGetMessageLists } from '@/hooks/message/message';

const ChatBoxScreen = () => {
  const { data } = useGetMessageLists();

  console.log(data);

  // const [chatRoomData, setChatRoomData] = useState(dummyData);

  const [isExitModalVisible, setIsExitModalVisible] = useState<boolean>(false);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<number | null>(null);

  const handleExitModal = (chatRoomId: number) => {
    setSelectedChatRoomId(chatRoomId);
    setIsExitModalVisible(true);
  };

  // const handleExit = () => {
  //   if (selectedChatRoomId !== null) {
  //     setChatRoomData((prevData) =>
  //       prevData.filter((room) => room.chatRoomId !== selectedChatRoomId),
  //     );
  //     setSelectedChatRoomId(null);
  //   }
  //   setIsExitModalVisible(false);
  // };

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === 'android' && 'pt-[50px]'}`}>
      <StatusBar style="dark" />
      <View className="flex-1">
        <FlatList
          bounces={false}
          stickyHeaderIndices={[0]}
          // 렌더링하는 전체 데이터
          data={data}
          // 각 아이템의 key 값 지정
          keyExtractor={(item) => item.id.toString()}
          // 아이템들을 렌더링하는 메서드
          renderItem={({ item }) => (
            <ChatRoomComponent chatRoomData={item} handleExitModal={handleExitModal} />
          )}
          // FlatList의 최상단에 렌더링되는 Header 아이템
          ListHeaderComponent={<HeaderComponent />}
          // FlatList의 최하단에 렌더링되는 Footer 아이템
          ListFooterComponent={<View className="h-16" />}
          // 렌더링 되는 아이템들 사이의 간격
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </View>

      {/* <CustomTwoBtnModal
        isVisible={isExitModalVisible}
        closeModal={() => setIsExitModalVisible(false)}
        title="쪽지함에서 나가시겠습니까?"
        leftBtnText="취소"
        leftBtnFunc={() => setIsExitModalVisible(false)}
        rightBtnText="나가기"
        rightBtnFunc={handleExit}
      /> */}
    </SafeAreaView>
  );
};

export default ChatBoxScreen;
