import { PostAxiosInstance } from '@/axios/axios.method';

// 공간 좋아요
export const toggleLikeSpace = async (id: number) => {
  const response = await PostAxiosInstance(`/like/like/space/${id}`);

  return response.data.content;
};

// 공고 좋아요
export const toggleLikeAnnouncement = async (id: number) => {
  const response = await PostAxiosInstance(`/like/like/announcement/${id}`);

  return response.data.content;
};
