import { useSuspenseQuery } from '@tanstack/react-query';

import { getSpaceLists, getSpaceDetailData } from '@/server/space/space';

// 공간 상세 조회
export const useGetSpaceDetailData = (id: number) => {
  return useSuspenseQuery({
    queryKey: [`/space/${id}`, id],
    queryFn: () => getSpaceDetailData(id),
  });
};

// 최신 공간 조회
export const useGetSpaceLists = () => {
  return useSuspenseQuery({
    queryKey: [`/space/latest`],
    queryFn: () => getSpaceLists(),
  });
};
