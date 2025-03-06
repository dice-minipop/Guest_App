import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { CreateReservationRequest } from '@/server/reservation/request';
import {
  createReservation,
  getImpossibleDateLists,
  getReservationLists,
} from '@/server/reservation/reservation';
import { CreateReservationResponse } from '@/server/reservation/response';
import { useReservationStore } from '@/zustands/reservation/store';

export const useCreateReservation = (refetch: () => void) => {
  const router = useRouter();

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
      refetch();
    },
  });
};

export const useGetReservationLists = () => {
  return useSuspenseQuery({
    queryKey: [`/reservation/list`],
    queryFn: () => getReservationLists(),
  });
};

export const useGetImpossibleDateLists = (spaceId: number) => {
  return useSuspenseQuery({
    queryKey: [`/reservation/available-dates`, spaceId],
    queryFn: () => getImpossibleDateLists(spaceId),
  });
};
