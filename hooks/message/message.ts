import { useMutation, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

import {
  createChatRoom,
  getMessageDetailData,
  getMessageLists,
  reportChatRoom,
  sendMessage,
} from '@/server/message/message';
import {
  CreateChatRoomRequest,
  ReportChatRoomRequest,
  SendMessageRequest,
} from '@/server/message/request';
import { MessageRoom } from '@/server/message/response';
import { useSpaceDataStore } from '@/zustands/space/store';

export const useGetMessageDetailData = (roomId: number) => {
  return useSuspenseInfiniteQuery({
    queryKey: [`/message/${roomId}`, roomId],
    queryFn: async ({ pageParam }) => {
      const response = getMessageDetailData(roomId, pageParam, 10);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.number + 1;
      }
    },
  });
};

export const useSendMessage = (roomId: number, refetch: () => void) => {
  return useMutation({
    mutationFn: (data: SendMessageRequest) => sendMessage(roomId, data),
    onSuccess: () => {
      refetch();
    },
  });
};

export const useReportChatRoom = () => {
  return useMutation({
    mutationFn: (data: ReportChatRoomRequest) => reportChatRoom(data),
    onSuccess: () => Alert.alert('신고가 접수되었습니다!'),
  });
};

export const useCreateChatRoom = (refetch: () => void) => {
  const router = useRouter();
  const { setSpaceName } = useSpaceDataStore();

  return useMutation({
    mutationFn: (data: CreateChatRoomRequest) => createChatRoom(data),
    onSuccess: (response: MessageRoom) => {
      setSpaceName(response.spaceName);
      router.push(`/chatRoom/${response.id}`);
      refetch();
    },
  });
};

export const useGetMessageLists = () => {
  return useSuspenseQuery({
    queryKey: [`/message/guest-list`],
    queryFn: () => getMessageLists(),
  });
};
