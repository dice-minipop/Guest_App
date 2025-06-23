import { PostAxiosInstance } from '@/axios/axios.method';

import { SaveFCMTokenRequest } from './request';

export const saveFCMToken = async (data: SaveFCMTokenRequest) => {
  const response = await PostAxiosInstance(`/fcm/token`, data);

  return response.data;
};
