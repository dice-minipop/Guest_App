import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleLikeAnnouncement, toggleLikeSpace } from '@/server/like/like';

// 공간 좋아요
export const useToggleSpaceLike = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLikeSpace(id),
    onSuccess: async () => {
      // 공간 목록 조회
      await queryClient.refetchQueries({
        queryKey: [`/space/list`],
        exact: false,
      });
      // 공간 상세 조회
      await queryClient.invalidateQueries({ queryKey: [`/space/${id}`, id] });
      // 좋아요 공간 목록
      await queryClient.invalidateQueries({ queryKey: [`/guest/like/space`] });
      // 공간 검색
      await queryClient.invalidateQueries({ queryKey: [`/space/list/search`] });
    },
  });
};

// 공고 좋아요
export const useToggleAnnouncementLike = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLikeAnnouncement(id),
    onSuccess: async () => {
      // 공고 목록 조회
      await queryClient.refetchQueries({
        queryKey: [`/announcement/list`],
        exact: false,
      });
      // 공고 상세 조회
      await queryClient.invalidateQueries({ queryKey: [`/announcement/${id}`, id] });
      // 좋아요 공고 목록
      await queryClient.invalidateQueries({ queryKey: [`/guest/like/announcement`] });
      // 공고 검색
      await queryClient.invalidateQueries({ queryKey: [`/announcement/list/search`] });
    },
  });
};
