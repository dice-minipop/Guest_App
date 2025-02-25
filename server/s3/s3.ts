import { ImagePickerAsset } from 'expo-image-picker';

import { PostAxiosInstance } from '@/axios/axios.method';

import { UploadImageListResponse, UploadImageResponse } from './response';

export const uploadImageList = async (
  imageList: ImagePickerAsset[],
): Promise<UploadImageListResponse> => {
  const formData = new FormData();

  imageList.forEach((image, index) => {
    formData.append('images', {
      uri: image.uri,
      type: image.mimeType ?? 'image/png',
      name: image.fileName ?? `image_${index}.png`,
    } as any);
  });

  const response = await PostAxiosInstance<UploadImageListResponse>(`/s3/uploads`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const uploadImage = async (imageList: ImagePickerAsset[]): Promise<UploadImageResponse> => {
  const formData = new FormData();

  imageList.forEach((image, index) => {
    formData.append('images', {
      uri: image.uri,
      type: image.mimeType ?? 'image/png',
      name: image.fileName ?? `image_${index}.png`,
    } as any);
  });

  console.log(formData);

  const response = await PostAxiosInstance<UploadImageResponse>(`/s3/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
