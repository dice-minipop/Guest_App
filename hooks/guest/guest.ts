import { useMutation, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
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
  return useSuspenseInfiniteQuery({
    queryKey: [`/guest/like/space`],
    queryFn: async ({ pageParam }) => {
      const response = getLikedSpaceLists(pageParam, 5);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.number + 1;
      }
    },
  });
};

// 공고 좋아요 목록 조회
export const useGetLikedAnnouncementLists = () => {
  return useSuspenseInfiniteQuery({
    queryKey: [`/guest/like/announcement`],
    queryFn: async ({ pageParam }) => {
      const response = getLikedAnnounceMentLists(pageParam, 5);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.number + 1;
      }
    },
  });
};

// 게스트 정보 조회
export const useGetGuestInfo = () => {
  return useSuspenseQuery({
    queryKey: [`/guest/info`],
    queryFn: () => getGuestInfo(),
  });
};
