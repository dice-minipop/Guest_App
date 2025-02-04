import { toggleLikeSpace } from '@/server/like/like';
import { useMutation } from '@tanstack/react-query';

// 공간 좋아요
export const useToggleLike = () => {
  return useMutation({
    mutationFn: (id: number) => toggleLikeSpace(id),
  });
};
