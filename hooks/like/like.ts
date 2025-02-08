import { toggleLikeAnnouncement, toggleLikeSpace } from '@/server/like/like';
import { useMutation } from '@tanstack/react-query';

// 공간 좋아요
export const useToggleSpaceLike = (refetch: any) => {
  return useMutation({
    mutationFn: (id: number) => toggleLikeSpace(id),
    onSuccess: () => {
      console.log('좋아요 클릭');
      refetch();
    },
  });
};

// 공고 좋아요
export const useToggleAnnouncementLike = (refetch: any) => {
  return useMutation({
    mutationFn: (id: number) => toggleLikeAnnouncement(id),
    onSuccess: () => {
      console.log('좋아요 클릭');
      refetch();
    },
  });
};
