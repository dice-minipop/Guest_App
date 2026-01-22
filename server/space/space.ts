import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';
import { SpaceDetailItem, SpaceFilterDTO } from '@/types/space';

import { GetSpaceListsResponse, SpacePopulationAnalysisResponse } from './response';

// 공간 필터링 조회
export const getFilteredSpaceLists = async (
  keyword?: string,
  page?: number,
  size?: number,
  data?: Partial<SpaceFilterDTO>,
): Promise<GetSpaceListsResponse> => {
  const response = await PostAxiosInstance<GetSpaceListsResponse>(`/v2/space/list`, data, {
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
  const response = await GetAxiosInstance<SpaceDetailItem>(`/v2/space/${id}`);

  return response.data;
};

// 공간 인구 분석
export const getSpacePopulationAnalysis = async (
  id: number,
): Promise<SpacePopulationAnalysisResponse> => {
  const response = await GetAxiosInstance<SpacePopulationAnalysisResponse>(
    `/v1/space/${id}/analysis`,
  );

  return response.data;
};
