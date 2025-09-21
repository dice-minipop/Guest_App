import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { CreateReservationRequest } from '@/server/reservation/request';
import {
  cancelReservation,
  createReservation,
  getImpossibleDateLists,
  getReservationLists,
} from '@/server/reservation/reservation';

export const useCreateReservation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReservationRequest) => createReservation(data),
    onSuccess: () => {
      router.push(`/space/reservation/complete`);
      queryClient.invalidateQueries({ queryKey: [`/reservation/list`] });
    },
  });
};

export const useCancelReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: number) => cancelReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/reservation/list`] });
    },
  });
};

export const useGetReservationLists = (status: string) => {
  return useInfiniteQuery({
    queryKey: [`/reservation/list`, status],
    queryFn: async ({ pageParam }) => getReservationLists(status, pageParam, 5),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.number + 1;
      }
    },
  });
};

export const useGetImpossibleDateLists = (spaceId: number) => {
  return useSuspenseQuery({
    queryKey: [`/reservation/available-dates`, spaceId],
    queryFn: () => getImpossibleDateLists(spaceId),
  });
};
