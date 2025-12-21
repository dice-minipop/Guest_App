// import { useActionSheet } from '@expo/react-native-action-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import CameraIcon from '@/assets/icons/chat/camera.svg';
import SendIcon from '@/assets/icons/chat/send.svg';
import SirenIcon from '@/assets/icons/chat/siren.svg';
import ChatItemComponent from '@/components/chat/chatItem';
import ReportModal from '@/components/chat/reportModal';
import BackHeaderComponent from '@/components/common/backHeader';
import { useGetMessageDetailData, useSendMessage } from '@/hooks/message/message';
// import { showCustomActionSheetWithMap } from '@/utils/actionSheetUtil';

export default function ChatDetail() {
  const { id, spaceName } = useLocalSearchParams();

  const flatListRef = useRef<FlatList<any>>(null);
  const reportModalRef = useRef<BottomSheet>(null);
  const { bottom } = useSafeAreaInsets();

  const { data, isLoading } = useGetMessageDetailData(Number(id));

  // const data = [
  //   {
  //     id: 1,
  //     content:
  //       '1월 26일부터 2주간 공간을 대여하고 싶은데 혹시 야간에 저희가 건물에 출입이 가능한지 궁금해서 문의드려요!',
  //     type: '',
  //     senderName: 'gd',
  //     senderId: 2,
  //     createdAt: '오전 12시',
  //     isLoginUsersMessage: true,
  //   },
  //   {
  //     id: 2,
  //     content:
  //       '1월 26일부터 2주간 공간을 대여하고 싶은데 혹시 야간에 저희가 건물에 출입이 가능한지 궁금해서 문의드려요!',
  //     type: '',
  //     senderName: 'gd',
  //     senderId: 3,
  //     createdAt: '오전 12시',
  //     isLoginUsersMessage: false,
  //   },
  //   {
  //     id: 3,
  //     content: '안녕하세요',
  //     type: '',
  //     senderName: 'gd',
  //     senderId: 3,
  //     createdAt: '오전 12시',
  //     isLoginUsersMessage: false,
  //   },
  //   {
  //     id: 4,
  //     content: '안녕하세요',
  //     type: '',
  //     senderName: 'gd',
  //     senderId: 3,
  //     createdAt: '오전 12시',
  //     isLoginUsersMessage: false,
  //   },
  //   {
  //     id: 5,
  //     content:
  //       '1월 26일부터 2주간 공간을 대여하고 싶은데 혹시 야간에 저희가 건물에 출입이 가능한지 궁금해서 문의드려요!',
  //     type: '',
  //     senderName: 'gd',
  //     senderId: 3,
  //     createdAt: '오전 12시',
  //     isLoginUsersMessage: false,
  //   },
  // ];

  // const { showActionSheetWithOptions } = useActionSheet();

  // const logoOptions = {
  //   options: ['앨범에서 사진 선택', '사진 찍기', '취소'],
  //   cancelButtonIndex: 2,
  //   tintColor: '#5B4FF4',
  // };

  // const logoActionMap = {
  //   0: () => console.log('앨범에서 사진 선택'),
  //   1: () => console.log('사진 찍기'),
  // };

  // const onPressCamera = () => {
  //   showCustomActionSheetWithMap(showActionSheetWithOptions, logoOptions, logoActionMap);
  // };

  useEffect(() => {
    // 렌더링 직후, 일정 시간 후에 스크롤 (setTimeout으로 타이밍 맞추기)
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: false });
    }, 10);
  }, []);

  const [message, setMessage] = useState<string>('');
  const { mutate: sendMessage } = useSendMessage(Number(id));

  const handleSend = () => {
    sendMessage({
      content: message,
      type: 'TEXT',
    });
    setMessage('');
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const messageData = data?.pages?.flatMap((page) => page.content) ?? [];

  return (
    <View className="flex-1 bg-back_gray">
      <StatusBar style="dark" />

      <BackHeaderComponent
        style="WHITE"
        title={spaceName as string}
        rightIcon={
          <Pressable
            className="flex flex-row p-[12px]"
            onPress={() => reportModalRef.current?.expand()}
          >
            <SirenIcon />
          </Pressable>
        }
      />

      {isLoading ? (
        <View className="flex-1 items-center justify-center bg-back_gray">
          <ActivityIndicator size="small" color="#5B4FF4" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ backgroundColor: '#F4F4F4', rowGap: 16 }}
          ref={flatListRef}
          data={[{ id: 'NOTICE', type: 'NOTICE' }, ...messageData]}
          renderItem={({ item }) => (
            <ChatItemComponent key={item.id} data={item} spaceName={spaceName as string} />
          )}
          ListFooterComponent={() => <View className="h-[64px]" />}
        />
      )}

      <View className="bg-white flex flex-row items-center gap-x-[8px] px-[20px] py-[16px]">
        {/* <Pressable onPress={onPressCamera} className="p-[12px]">
          <CameraIcon />
        </Pressable> */}
        <View className="flex-1 flex flex-row items-center pl-[12px] border border-light_gray rounded-lg">
          <TextInput
            placeholder="쪽지 작성하기"
            placeholderTextColor={'#CCCCCC'}
            className="h-[48px] flex-1"
            value={message}
            onChangeText={setMessage}
          />

          <Pressable onPress={handleSend} className="p-[12px]">
            <SendIcon />
          </Pressable>
        </View>
      </View>
      <View style={{ height: bottom, backgroundColor: '#FFFFFF' }} />

      <ReportModal bottomSheetRef={reportModalRef} />
    </View>
  );
}
