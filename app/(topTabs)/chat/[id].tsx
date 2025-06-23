import { useActionSheet } from '@expo/react-native-action-sheet';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { FlatList, Pressable, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CameraIcon from '@/assets/icons/chat/camera.svg';
import SendIcon from '@/assets/icons/chat/send.svg';
import SirenIcon from '@/assets/icons/chat/siren.svg';
import ChatItemComponent from '@/components/chat/chatItem';
import BackHeaderComponent from '@/components/common/backHeader';
import { useGetMessageDetailData } from '@/hooks/message/message';
import { showCustomActionSheetWithMap } from '@/utils/actionSheetUtil';

export default function ChatDetail() {
  const { id, spaceName } = useLocalSearchParams();

  const flatListRef = useRef<FlatList<any>>(null);
  const { bottom } = useSafeAreaInsets();

  // const { data, fetchNextPage, hasNextPage } = useGetMessageDetailData(Number(id));

  const data = [
    {
      id: 1,
      content: '안녕하세요',
      type: '',
      senderName: 'gd',
      senderId: 2,
      createdAt: '오전 12시',
      isLoginUsersMessage: true,
    },
    {
      id: 2,
      content: '안녕하세요',
      type: '',
      senderName: 'gd',
      senderId: 3,
      createdAt: '오전 12시',
      isLoginUsersMessage: false,
    },
  ];

  const { showActionSheetWithOptions } = useActionSheet();

  const logoOptions = {
    options: ['앨범에서 사진 선택', '사진 찍기', '취소'],
    cancelButtonIndex: 2,
    tintColor: '#5B4FF4',
  };

  const logoActionMap = {
    0: () => console.log('앨범에서 사진 선택'),
    1: () => console.log('사진 찍기'),
  };

  const onPressCamera = () => {
    showCustomActionSheetWithMap(showActionSheetWithOptions, logoOptions, logoActionMap);
  };

  useEffect(() => {
    // 렌더링 직후, 일정 시간 후에 스크롤 (setTimeout으로 타이밍 맞추기)
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: false });
    }, 10);
  }, []);

  return (
    <View className="flex-1 bg-back_gray">
      <BackHeaderComponent
        style="WHITE"
        title={spaceName as string}
        rightIcon={
          <Pressable className="flex flex-row p-[12px]">
            <SirenIcon />
          </Pressable>
        }
      />

      <FlatList
        contentContainerStyle={{ flex: 1, backgroundColor: '#F4F4F4' }}
        ref={flatListRef}
        // data={[{ id: 'NOTICE', type: 'NOTICE' }, ...data.pages.flatMap((page) => page.content)]}
        data={[{ id: 'NOTICE', type: 'NOTICE' }, ...data]}
        renderItem={({ item }) => <ChatItemComponent key={item.id} data={item} />}
      />

      <View className="bg-white flex flex-row items-center gap-x-[8px] pl-[8px] pr-[20px] py-[16px]">
        <Pressable onPress={onPressCamera} className="p-[12px]">
          <CameraIcon />
        </Pressable>
        <View className="flex-1 flex flex-row items-center pl-[12px] border border-light_gray rounded-lg">
          <TextInput
            placeholder="쪽지 작성하기"
            placeholderTextColor={'#CCCCCC'}
            className="h-[48px] flex-1"
          />
          <Pressable className="p-[12px]">
            <SendIcon />
          </Pressable>
        </View>
      </View>
      <View style={{ height: bottom, backgroundColor: '#FFFFFF' }} />
    </View>
  );
}
