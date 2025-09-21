import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';
import { AnnouncementFilterDTO } from '@/types/announcement';

import { GetAnnouncementDetailDataResponse, GetAnnouncementListsResponse } from './response';

// 모집 공고 리스트 조회
export const getAnnouncementLists = async (
  keyword?: string,
  page?: number,
  size?: number,
  data?: Partial<AnnouncementFilterDTO>,
): Promise<GetAnnouncementListsResponse> => {
  const response = await PostAxiosInstance<GetAnnouncementListsResponse>(
    `/v1/announcement/list`,
    data,
    {
      params: {
        keyword,
        page,
        size,
      },
    },
  );

  return response.data;
};

export const getAnnouncementDetailData = async (
  id: number,
): Promise<GetAnnouncementDetailDataResponse> => {
  const response = await GetAxiosInstance<GetAnnouncementDetailDataResponse>(
    `/v1/announcement/${id}`,
  );

  return response.data;
};
