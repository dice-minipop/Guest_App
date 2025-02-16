import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

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
export const useGetFilteredSpaceLists = (data?: Partial<SpaceFilterDTO>) => {
  return useSuspenseInfiniteQuery({
    queryKey: [`/space/list`],
    queryFn: async ({ pageParam }) => {
      const response = getFilteredSpaceLists(data, pageParam, 5);
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

// 최신 공간 조회
// export const useGetSpaceLists = () => {
//   return useSuspenseQuery({
//     queryKey: [`/space/latest`],
//     queryFn: () => getFilteredSpaceLists(),
//   });
// };
