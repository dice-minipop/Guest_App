import { SpaceDetailItem } from '@/types/space';
import { GetFilteredSpaceListsRequest } from './request';

import { GuestGetAxiosInstance, GuestPostAxiosInstance } from '@/axios/guest.axios.method';
import { GetSpaceListsResponse, SpaceItem } from './response';

// 공간 상세 조회
export const getSpaceDetailData = async (id: number): Promise<SpaceDetailItem> => {
  const response = await GuestGetAxiosInstance<SpaceDetailItem>(`/space/${id}`);

  return response.data;
};

// 공간 필터링 조회
export const getFilteredSpaceLists = async (
  data: GetFilteredSpaceListsRequest,
  page?: number,
  size?: number,
) => {
  const response = await GuestPostAxiosInstance(`/space/list`, data, {
    params: {
      page: page,
      size: size,
    },
  });

  return response.data.content;
};

// 최신 공간 조회
export const getSpaceLists = async (
  page?: number,
  size?: number,
): Promise<GetSpaceListsResponse> => {
  const response = await GuestGetAxiosInstance<GetSpaceListsResponse>(`/space/latest`, {
    params: {
      page: page,
      size: size,
    },
  });

  return response.data;
};
