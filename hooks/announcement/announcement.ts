import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import {
  getAnnouncementDetailData,
  getAnnouncementLists,
} from '@/server/announcement/announcement';
import { AnnouncementFilterDTO } from '@/types/announcement';

// 모집 공고 리스트 조회
export const useGetAnnouncementLists = (data: Partial<AnnouncementFilterDTO>) => {
  const filteredData = { ...data };

  if (data?.city === '전국' || data?.city === '세종') {
    delete filteredData.city;
  }

  return useSuspenseInfiniteQuery({
    queryKey: [`/announcement/list`],
    queryFn: async ({ pageParam }) => {
      await new Promise((res) => setTimeout(res, 5000)); // 1.5초 delay
      const response = getAnnouncementLists(undefined, pageParam, 5, filteredData);
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

// 모집 공고 검색
export const useGetSearchedAnnouncementLists = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: [`/announcement/list`, keyword],
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
  return useSuspenseQuery({
    queryKey: [`/announcement/${id}`, id],
    queryFn: () => getAnnouncementDetailData(id),
  });
};
