import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import {
  getGuestInfo,
  getLikedAnnounceMentLists,
  getLikedSpaceLists,
  updateGuestInfo,
} from '@/server/guest/guest';
import { UpdateInfoRequest } from '@/server/guest/request';

// 게스트 정보 수정
export const useUpdateGuestInfo = (refetch: any) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdateInfoRequest) => updateGuestInfo(data),
    onSuccess: () => {
      refetch();
      router.back();
    },
  });
};

// 공간 좋아요 목록 조회
export const useGetLikedSpaceLists = () => {
  return useSuspenseQuery({
    queryKey: [`/guest/like/space`],
    queryFn: () => getLikedSpaceLists(),
  });
};

// 공고 좋아요 목록 조회
export const useGetLikedAnnouncementLists = () => {
  return useSuspenseQuery({
    queryKey: [`/guest/like/announcement`],
    queryFn: () => getLikedAnnounceMentLists(),
  });
};

// 게스트 정보 조회
export const useGetGuestInfo = () => {
  return useSuspenseQuery({
    queryKey: [`/guest/info`],
    queryFn: () => getGuestInfo(),
  });
};
