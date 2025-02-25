import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import { CreateBrandRequest, UpdateBrandRequest } from './request';
import { GetMyBrandInfoResponse } from './response';

// 브랜드 수정
export const updateBrand = async (brandId: number, data: UpdateBrandRequest) => {
  const response = await PostAxiosInstance(`/brand/update/${brandId}`, data);

  return response.data;
};

// 브랜드 생성
export const createBrand = async (data: CreateBrandRequest) => {
  const response = await PostAxiosInstance(`/brand/create`, data);

  return response.data;
};

// 자신의 브랜드 조회
export const getMyBrandInfo = async (): Promise<GetMyBrandInfoResponse> => {
  const response = await GetAxiosInstance<GetMyBrandInfoResponse>(`/brand/list`);

  return response.data;
};
