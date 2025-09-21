import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getSpaceDetailData, getFilteredSpaceLists } from '@/server/space/space';
import { SpaceFilterDTO } from '@/types/space';

// 공간 상세 조회
export const useGetSpaceDetailData = (id: number) => {
  return useQuery({
    queryKey: [`/space/${id}`, id],
    queryFn: () => getSpaceDetailData(id),
  });
};

// 공간 필터링 조회
export const useGetFilteredSpaceLists = (data: Partial<SpaceFilterDTO>) => {
  return useInfiniteQuery({
    queryKey: [`/space/list`],
    queryFn: async ({ pageParam }) => getFilteredSpaceLists(undefined, pageParam, 5, data),
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
