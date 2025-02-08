import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { getSpaceLists, getSpaceDetailData, getFilteredSpaceLists } from '@/server/space/space';
import { GetFilteredSpaceListsRequest } from '@/server/space/request';

// 공간 상세 조회
export const useGetSpaceDetailData = (id: number) => {
  return useSuspenseQuery({
    queryKey: [`/space/${id}`, id],
    queryFn: () => getSpaceDetailData(id),
  });
};

// 공간 필터링 조회
export const useGetFilteredSpaceLists = (handleData: (data: any) => void) => {
  return useMutation({
    mutationFn: (data: GetFilteredSpaceListsRequest) => getFilteredSpaceLists(data),
    onSuccess: (response) => {
      handleData(response);
      console.log(response);
    },
  });
};

// 최신 공간 조회
export const useGetSpaceLists = () => {
  return useSuspenseQuery({
    queryKey: [`/space/latest`],
    queryFn: () => getSpaceLists(),
  });
};
