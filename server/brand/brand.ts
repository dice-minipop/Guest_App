import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import { CreateBrandRequest, UpdateBrandRequest } from './request';

export const updateBrand = async (brandId: number, data: UpdateBrandRequest) => {
  const response = await PostAxiosInstance(`/brand/update/${brandId}`, data);

  return response.data;
};

export const createBrand = async (data: CreateBrandRequest) => {
  const response = await PostAxiosInstance(`/brand/create`, data);

  return response.data;
};

export const getMyBrandInfo = async () => {
  const response = await GetAxiosInstance(`/brand/my`);

  return response.data;
};
