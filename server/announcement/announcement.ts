import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';
import { GuestPostAxiosInstance } from '@/axios/guest.axios.method';
import { AnnouncementFilterDTO } from '@/types/announcement';

import { GetAnnouncementDetailDataResponse, GetAnnouncementListsResponse } from './response';

// 모집 공고 리스트 조회
export const getAnnouncementLists = async (
  data?: Partial<AnnouncementFilterDTO>,
  page?: number,
  size?: number,
): Promise<GetAnnouncementListsResponse> => {
  const response = await PostAxiosInstance<GetAnnouncementListsResponse>(
    `/announcement/list`,
    data,
    {
      params: {
        page: page,
        size: size,
      },
    },
  );

  return response.data;
};

// 모집 공고 검색
export const getSearchedAnnouncementLists = async (
  keyword?: string,
  page?: number,
  size?: number,
): Promise<GetAnnouncementListsResponse> => {
  const response = await GuestPostAxiosInstance<GetAnnouncementListsResponse>(
    `/announcement/list`,
    {
      params: {
        keyword: keyword,
        page: page,
        size: size,
      },
    },
  );

  return response.data;
};

export const getAnnouncementDetailData = async (
  id: number,
): Promise<GetAnnouncementDetailDataResponse> => {
  const response = await GetAxiosInstance<GetAnnouncementDetailDataResponse>(`/announcement/${id}`);

  return response.data;
};
