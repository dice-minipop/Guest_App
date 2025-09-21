import { Text, View } from 'react-native';

import { ChatRoomDetailItem } from '@/types/chat';

interface ChatItemComponentProps {
  data: ChatRoomDetailItem;
}

export default function ChatItemComponent({ data }: ChatItemComponentProps) {
  if (data.type === 'NOTICE') {
    return (
      <View className="bg-white mt-[24px] rounded-lg p-[16px] mx-[20px]">
        <Text className="CAP1 text-deep_gray text-center">
          ‘성수동 연무장길 갤러리 팝업 맷멀’ 담당자님과의 쪽지가 시작되었습니다. 불필요한 비방과
          부적절한 언행은 제재 대상이 될 수 있습니다.
        </Text>
      </View>
    );
  } else if (data.isLoginUsersMessage) {
    return (
      <View className="self-end mr-[20px]">
        <Text className="CAP1 text-medium_gray text-right">{data.createdAt}</Text>
        <View className="max-w-[240px] bg-dark_gray px-[12px] py-[8px] mt-[4px] rounded-lg rounded-tr-[1px]">
          <Text className="BODY1 text-white">{data.content}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View className="ml-[20px]">
        <Text className="CAP1 text-medium_gray">
          {data.senderName} · 호스트 {data.createdAt}
        </Text>
        <View className="max-w-[240px] bg-white self-start px-[12px] py-[8px] mt-[4px]  rounded-lg rounded-tl-[1px]">
          <Text className="BODY1 text-deep_gray">{data.content}</Text>
        </View>
      </View>
    );
  }
}
