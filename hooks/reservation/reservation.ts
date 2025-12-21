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
import { CreateReservationResponse } from '@/server/reservation/response';

export const useCreateReservation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReservationRequest) => createReservation(data),
    onSuccess: (response: CreateReservationResponse) => {
      console.log(response);
      router.push(
        `/space/reservation/complete?reservationId=${response.id}&name=${response.name}&startDate=${response.startDate}&endDate=${response.endDate}&totalPrice=${response.totalPrice}`,
      );
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

export const useGetReservationLists = (status: string, sort?: string) => {
  return useInfiniteQuery({
    queryKey: [`/reservation/list`, status, sort],
    queryFn: async ({ pageParam }) => getReservationLists(status, sort, pageParam, 5),
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
