import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Pressable, TextInput } from 'react-native';

import { useGetMessageDetailData, useSendMessage } from '@/hooks/message/message';

import Icon from '../icon/icon';

const FooterComponent: React.FC = () => {
  const { id } = useLocalSearchParams();

  const { refetch } = useGetMessageDetailData(Number(id));

  const { mutateAsync: sendChat } = useSendMessage(Number(id), refetch);

  const [content, setContent] = useState<string>('');

  const handleSend = (content: string) => {
    sendChat({ content: content, type: 'TEXT' });
    setContent('');
  };

  return (
    <View className="fixed bottom-0 flex-row items-center bg-white py-2 pl-1.5 pr-5">
      <Pressable className="p-3">{/* <Camera /> */}</Pressable>

      <View className="flex-1 flex-row items-center gap-x-1 rounded-lg border border-light_gray pl-3 h-12">
        <TextInput
          value={content}
          onChangeText={(text: string) => setContent(text)}
          placeholder="쪽지 작성하기"
          placeholderTextColor={'#CCCCCC'}
          className="flex-1 text-BODY1 font-BODY1 text-dark_gray"
        />

        <Pressable onPress={() => handleSend(content)} className="p-3">
          <Icon.Send />
        </Pressable>
      </View>
    </View>
  );
};

export default FooterComponent;
