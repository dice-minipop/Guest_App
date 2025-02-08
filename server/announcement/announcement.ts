import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';
import { GetAnnouncementDetailDataResponse, GetAnnouncementListsResponse } from './response';
import { GetAnnouncementListsRequest } from './request';
import { GuestPostAxiosInstance } from '@/axios/guest.axios.method';

// 모집 공고 리스트 조회
export const getAnnouncementLists = async (
  data?: GetAnnouncementListsRequest,
  page?: number,
  size?: number,
): Promise<GetAnnouncementListsResponse> => {
  const response = await GuestPostAxiosInstance<GetAnnouncementListsResponse>(
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

export const getAnnouncementDetailData = async (
  id: number,
): Promise<GetAnnouncementDetailDataResponse> => {
  const response = await GetAxiosInstance<GetAnnouncementDetailDataResponse>(`/announcement/${id}`);

  return response.data;
};
