import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';
import { SpaceDetailItem, SpaceFilterDTO } from '@/types/space';

import { GetSpaceListsResponse } from './response';

// 공간 필터링 조회
export const getFilteredSpaceLists = async (
  keyword?: string,
  page?: number,
  size?: number,
  data?: Partial<SpaceFilterDTO>,
): Promise<GetSpaceListsResponse> => {
  const response = await PostAxiosInstance<GetSpaceListsResponse>(`/space/list`, data, {
    params: {
      keyword,
      page,
      size,
    },
  });

  return response.data;
};

// 공간 상세 조회
export const getSpaceDetailData = async (id: number): Promise<SpaceDetailItem> => {
  const response = await GetAxiosInstance<SpaceDetailItem>(`/space/${id}`);

  return response.data;
};
