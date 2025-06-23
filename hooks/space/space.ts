import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { getSpaceDetailData, getFilteredSpaceLists } from '@/server/space/space';
import { SpaceFilterDTO } from '@/types/space';

// 공간 상세 조회
export const useGetSpaceDetailData = (id: number) => {
  return useSuspenseQuery({
    queryKey: [`/space/${id}`, id],
    queryFn: () => getSpaceDetailData(id),
  });
};

// 공간 필터링 조회
export const useGetFilteredSpaceLists = (data: Partial<SpaceFilterDTO>) => {
  const filteredData = { ...data };

  // 최소가격과 최대가격이 모두 30만원인 경우 maxPrice 제거
  if (data?.minPrice === 300000 && data?.maxPrice === 300000) {
    delete filteredData.maxPrice;
  }

  if (data?.city === '전국' || data?.city === '세종') {
    delete filteredData.city;
  }

  if (data?.district === '전체') {
    delete filteredData.district;
  }

  return useSuspenseInfiniteQuery({
    queryKey: [`/space/list`],
    queryFn: async ({ pageParam }) => getFilteredSpaceLists(undefined, pageParam, 5, filteredData),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.number + 1;
      }
    },
  });
};

// 공간 검색
export const useGetSearchedSpaceLists = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: [`/space/list/search`, keyword],
    queryFn: async ({ pageParam }) => {
      const response = getFilteredSpaceLists(keyword, pageParam, 5, undefined);
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
