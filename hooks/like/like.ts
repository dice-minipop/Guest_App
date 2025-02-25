import { useMutation } from '@tanstack/react-query';

import { toggleLikeAnnouncement, toggleLikeSpace } from '@/server/like/like';

// 공간 좋아요
export const useToggleSpaceLike = (refetch: any, refetchList?: any) => {
  return useMutation({
    mutationFn: (id: number) => toggleLikeSpace(id),
    onSuccess: () => {
      refetch();
      refetchList();
    },
  });
};

// 공고 좋아요
export const useToggleAnnouncementLike = (refetch: any, refetchList?: any) => {
  return useMutation({
    mutationFn: (id: number) => toggleLikeAnnouncement(id),
    onSuccess: () => {
      refetch();
      refetchList();
    },
  });
};
