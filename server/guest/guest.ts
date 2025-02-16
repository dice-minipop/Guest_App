import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import { UpdateInfoRequest } from './request';
import {
  GetGuestInfoResponse,
  GetLikedAnnouncementListsResponse,
  GetLikedSpaceListsResponse,
  UpdateInfoResponse,
} from './response';

// 게스트 정보 수정
export const updateGuestInfo = async (data: UpdateInfoRequest): Promise<UpdateInfoResponse> => {
  const response = await PostAxiosInstance<UpdateInfoResponse>(`/guest/update`, data);

  return response.data;
};

// 공간 좋아요 목록 조회
export const getLikedSpaceLists = async (
  page?: number,
  size?: number,
): Promise<GetLikedSpaceListsResponse> => {
  const response = await GetAxiosInstance<GetLikedSpaceListsResponse>(`/guest/like/space`, {
    params: {
      page: page,
      size: size,
    },
  });

  return response.data;
};

// 공고 좋아요 목록 조회
export const getLikedAnnounceMentLists = async (
  page?: number,
  size?: number,
): Promise<GetLikedAnnouncementListsResponse> => {
  const response = await GetAxiosInstance<GetLikedAnnouncementListsResponse>(
    `/guest/like/announcement`,
    {
      params: {
        page: page,
        size: size,
      },
    },
  );

  return response.data;
};

// 게스트 정보 조회
export const getGuestInfo = async (): Promise<GetGuestInfoResponse> => {
  const response = await GetAxiosInstance<GetGuestInfoResponse>(`/guest/info`);

  return response.data;
};
