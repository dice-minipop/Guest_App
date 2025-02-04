import { SendMessageRequest } from './request';

import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

// 메시지 상세 조회
export const getMessageDetailData = async (roomId: number, page?: number, size?: number) => {
  const response = await GetAxiosInstance(`/message/${roomId}`, {
    params: {
      page: page,
      size: size,
    },
  });

  return response;
};

// 메시지 전송
export const sendMessage = async (roomId: number, data: SendMessageRequest) => {
  const response = await PostAxiosInstance(`/message/${roomId}`, data);

  return response;
};

// 메시지 목록 조회
export const getMessageLists = async () => {
  const response = await GetAxiosInstance(`/message/guest-list`);

  return response;
};
