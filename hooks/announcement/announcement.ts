import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import {
  getAnnouncementDetailData,
  getAnnouncementLists,
  getSearchedAnnouncementLists,
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
      const response = getAnnouncementLists(filteredData, pageParam, 5);
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
  return useSuspenseInfiniteQuery({
    queryKey: [`/announcement/list`, keyword],
    queryFn: async ({ pageParam }) => {
      const response = getSearchedAnnouncementLists(keyword, pageParam, 5);
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

// 모집 공고 상세 조회
export const useGetAnnouncementDetailData = (id: number) => {
  return useSuspenseQuery({
    queryKey: [`/announcement/${id}`, id],
    queryFn: () => getAnnouncementDetailData(id),
  });
};
