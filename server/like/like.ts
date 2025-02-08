import { PostAxiosInstance } from '@/axios/axios.method';
import { ToggleLikeResponse } from './response';

// 공간 좋아요
export const toggleLikeSpace = async (id: number): Promise<ToggleLikeResponse> => {
  const response = await PostAxiosInstance<ToggleLikeResponse>(`/like/like/space/${id}`);

  return response.data;
};

// 공고 좋아요
export const toggleLikeAnnouncement = async (id: number): Promise<ToggleLikeResponse> => {
  const response = await PostAxiosInstance<ToggleLikeResponse>(`/like/like/announcement/${id}`);

  return response.data;
};
