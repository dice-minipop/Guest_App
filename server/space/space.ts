import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';
import { GuestGetAxiosInstance } from '@/axios/guest.axios.method';
import { SpaceDetailItem, SpaceFilterDTO } from '@/types/space';

import { GetSpaceListsResponse } from './response';

// 공간 상세 조회
export const getSpaceDetailData = async (id: number): Promise<SpaceDetailItem> => {
  const response = await GetAxiosInstance<SpaceDetailItem>(`/space/${id}`);

  return response.data;
};

// 공간 필터링 조회
export const getFilteredSpaceLists = async (
  data?: Partial<SpaceFilterDTO>,
  page?: number,
  size?: number,
): Promise<GetSpaceListsResponse> => {
  const response = await PostAxiosInstance<GetSpaceListsResponse>(`/space/list`, data, {
    params: {
      page: page,
      size: size,
    },
  });

  return response.data;
};

// 공간 검색
export const getSearchedSpaceLists = async (keyword?: string, page?: number, size?: number) => {
  const response = await PostAxiosInstance<GetSpaceListsResponse>(`/space/list`, {
    params: {
      keyword: keyword,
      page: page,
      size: size,
    },
  });

  return response.data;
};
