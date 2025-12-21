import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useGetMessageDetailData = (roomId: number) => {
  return useInfiniteQuery({
    queryKey: [`/message/${roomId}`, roomId],
    queryFn: async ({ pageParam }) => getMessageDetailData(roomId, pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.number + 1;
      }
    },
  });
};

export const useSendMessage = (roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendMessageRequest) => sendMessage(roomId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/message/${roomId}`] });
    },
  });
};

export const useReportChatRoom = () => {
  return useMutation({
    mutationFn: (data: ReportChatRoomRequest) => reportChatRoom(data),
    onSuccess: () => Alert.alert('신고가 접수되었습니다!'),
  });
};

export const useCreateChatRoom = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateChatRoomRequest) => createChatRoom(data),
    onSuccess: (response: MessageRoom) => {
      router.push({
        pathname: '/chat/[id]',
        params: {
          id: String(response.id),
          spaceName: response.spaceName,
        },
      });
    },
  });
};

export const useGetMessageLists = () => {
  return useQuery({
    queryKey: [`/message/guest-list`],
    queryFn: () => getMessageLists(),
  });
};
