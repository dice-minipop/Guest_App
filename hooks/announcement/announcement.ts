import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  getAnnouncementDetailData,
  getAnnouncementLists,
} from '@/server/announcement/announcement';
import { AnnouncementFilterDTO } from '@/types/announcement';

// 모집 공고 리스트 조회
export const useGetAnnouncementLists = (data: Partial<AnnouncementFilterDTO>) => {
  return useInfiniteQuery({
    queryKey: [`/announcement/list`],
    queryFn: ({ pageParam }) => getAnnouncementLists(undefined, pageParam, 5, data),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.number + 1;
      }
    },
  });
};

// 모집 공고 검색
export const useGetSearchedAnnouncementLists = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: [`/announcement/list/search`, keyword],
    queryFn: async ({ pageParam }) => {
      const response = getAnnouncementLists(keyword, pageParam, 5);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.number + 1;
      }
    },
    enabled: keyword !== '',
  });
};

// 모집 공고 상세 조회
export const useGetAnnouncementDetailData = (id: number) => {
  return useQuery({
    queryKey: [`/announcement/${id}`, id],
    queryFn: () => getAnnouncementDetailData(id),
  });
};
