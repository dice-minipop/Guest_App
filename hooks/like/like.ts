import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleLikeAnnouncement, toggleLikeSpace } from '@/server/like/like';

// 공간 좋아요
export const useToggleSpaceLike = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLikeSpace(id),
    onSuccess: () => {
      // 공간 목록 조회
      queryClient.invalidateQueries({ queryKey: [`/space/list`] });
      // 공간 상세 조회
      queryClient.invalidateQueries({ queryKey: [`/space/${id}`, id] });
      // 좋아요 공간 목록
      queryClient.invalidateQueries({ queryKey: [`/guest/like/space`] });
    },
  });
};

// 공고 좋아요
export const useToggleAnnouncementLike = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLikeAnnouncement(id),
    onSuccess: () => {
      // 공간 목록 조회
      queryClient.invalidateQueries({ queryKey: [`/announcement/list`] });
      // 공간 상세 조회
      queryClient.invalidateQueries({ queryKey: [`/announcement/${id}`, id] });
      // 좋아요 공간 목록
      queryClient.invalidateQueries({ queryKey: [`/guest/like/announcement`] });
    },
  });
};
