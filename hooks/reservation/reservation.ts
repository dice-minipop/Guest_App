import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
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
import { CreateReservationResponse } from '@/server/reservation/response';
import { useReservationStore } from '@/zustands/reservation/store';

export const useCreateReservation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { setReservationData } = useReservationStore();

  return useMutation({
    mutationFn: (data: CreateReservationRequest) => createReservation(data),
    onSuccess: (response: CreateReservationResponse) => {
      setReservationData({
        id: response.id,
        startDate: response.startDate,
        endDate: response.endDate,
      });
      router.push('/reservation');
      queryClient.invalidateQueries({ queryKey: [`/reservation/list`, 'PENDING'] });
    },
  });
};

export const useCancelReservation = (status: 'PENDING' | 'ACCEPT' | 'CANCEL') => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: number) => cancelReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/reservation/list`, status] });
    },
  });
};

export const useGetReservationLists = (status: string) => {
  return useInfiniteQuery({
    queryKey: [`/reservation/list`, status],
    queryFn: async ({ pageParam }) => {
      const response = getReservationLists(status, pageParam, 5);
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

export const useGetImpossibleDateLists = (spaceId: number) => {
  return useSuspenseQuery({
    queryKey: [`/reservation/available-dates`, spaceId],
    queryFn: () => getImpossibleDateLists(spaceId),
  });
};
