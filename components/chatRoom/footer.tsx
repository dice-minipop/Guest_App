import React, { useState } from 'react';
import { View, Pressable, TextInput } from 'react-native';

// import Send from '@assets/chatRoom/send.svg';
// import Camera from '@assets/chatRoom/camera.svg';

const FooterComponent: React.FC = () => {
  const [content, setContent] = useState<string>('');

  return (
    <View className="fixed bottom-0 flex-row items-center bg-white py-2 pl-1.5 pr-5">
      <Pressable className="p-3">{/* <Camera /> */}</Pressable>

      <View className="flex flex-1 flex-row items-center gap-x-1 rounded-lg border border-light_gray pl-3">
        <TextInput
          value={content}
          onChangeText={(text: string) => setContent(text)}
          placeholder="쪽지 작성하기"
          className="flex-1 py-0 font-BODY1 text-BODY1 leading-BODY1 text-dark_gray placeholder:font-BODY2 placeholder:text-BODY2 placeholder:leading-BODY2 placeholder:text-light_gray"
        />

        <Pressable className="p-3">{/* <Send /> */}</Pressable>
      </View>
    </View>
  );
};

export default FooterComponent;
