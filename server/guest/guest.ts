import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';
import { UpdateInfoRequest } from './request';

// 게스트 정보 수정
export const updateGuestInfo = async (data: UpdateInfoRequest) => {
  const response = await PostAxiosInstance(`/guest/update`, data);

  return response;
};

// 공간 좋아요 목록 조회
export const getLikedSpaceLists = async (page?: number, size?: number) => {
  const response = await GetAxiosInstance(`/guest/like/space`, {
    params: {
      page: page,
      size: size,
    },
  });

  return response;
};

// 공고 좋아요 목록 조회
export const getLikedAnnounceMentLists = async (page?: number, size?: number) => {
  const response = await GetAxiosInstance(`/guest/like/announcement`, {
    params: {
      page: page,
      size: size,
    },
  });

  return response;
};

// 게스트 정보 조회
export const getGuestInfo = async () => {
  const response = await GetAxiosInstance(`/guest/info`);

  return response;
};
