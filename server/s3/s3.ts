import { PostAxiosInstance } from '@/axios/axios.method';

import { UploadImageListResponse, UploadImageResponse } from './response';

export const uploadImageList = async (data: any): Promise<UploadImageListResponse> => {
  const response = await PostAxiosInstance<UploadImageListResponse>(`/s3/uploads`, data);

  return response.data;
};

export const uploadImage = async (data: any): Promise<UploadImageResponse> => {
  const response = await PostAxiosInstance<UploadImageResponse>(`/s3/upload`, data);

  return response.data;
};
