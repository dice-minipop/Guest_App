import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import { CreateChatRoomRequest, ReportChatRoomRequest, SendMessageRequest } from './request';
import { GetMessageDetailDataResponse, GetMessageListsResponse, MessageRoom } from './response';

// 메시지 상세 조회
export const getMessageDetailData = async (
  roomId: number,
  page?: number,
  size?: number,
): Promise<GetMessageDetailDataResponse> => {
  const response = await GetAxiosInstance<GetMessageDetailDataResponse>(`/message/${roomId}`, {
    params: {
      page: page,
      size: size,
    },
  });

  return response.data;
};

// 메시지 전송
export const sendMessage = async (roomId: number, data: SendMessageRequest) => {
  const response = await PostAxiosInstance(`/message/${roomId}`, data);

  return response.data;
};

// 메시지 신고
export const reportChatRoom = async (data: ReportChatRoomRequest) => {
  const response = await PostAxiosInstance<ReportChatRoomRequest>(`/message/report`, data);

  return response.data;
};

// 메시지 방 생성
export const createChatRoom = async (data: CreateChatRoomRequest): Promise<MessageRoom> => {
  const response = await PostAxiosInstance<MessageRoom>(`/message/create`, data);

  return response.data;
};

// 메시지 목록 조회
export const getMessageLists = async (): Promise<GetMessageListsResponse> => {
  const response = await GetAxiosInstance<GetMessageListsResponse>(`/message/guest-list`);

  return response.data;
};
