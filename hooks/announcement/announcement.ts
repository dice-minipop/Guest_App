import {
  getAnnouncementDetailData,
  getAnnouncementLists,
} from '@/server/announcement/announcement';
import { useSuspenseQuery } from '@tanstack/react-query';

// 모집 공고 리스트 조회
export const useGetAnnouncementLists = () => {
  return useSuspenseQuery({
    queryKey: [`/announcement/list`],
    queryFn: () => getAnnouncementLists(),
  });
};

// 모집 공고 상세 조회
export const useGetAnnouncementDetailData = (id: number) => {
  return useSuspenseQuery({
    queryKey: [`/announcement/${id}`, id],
    queryFn: () => getAnnouncementDetailData(id),
  });
};
