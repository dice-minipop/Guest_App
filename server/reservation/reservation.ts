import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import { CreateReservationRequest } from './request';
import {
  CreateReservationResponse,
  GetImpossibleDateListsResponse,
  GetReservationListsResponse,
} from './response';

// 예약
export const createReservation = async (
  data: CreateReservationRequest,
): Promise<CreateReservationResponse> => {
  const response = await PostAxiosInstance<CreateReservationResponse>(`/reservation/reserve`, data);

  return response.data;
};

// 예약 취소
export const cancelReservation = async (reservationId: number) => {
  const response = await PostAxiosInstance(`/reservation/cancel`, null, {
    params: {
      reservationId: reservationId,
    },
  });

  return response.data;
};

// 예약 목록 조회
export const getReservationLists = async (
  status: string,
  page?: number,
  size?: number,
): Promise<GetReservationListsResponse> => {
  const response = await GetAxiosInstance<GetReservationListsResponse>(`/reservation/list`, {
    params: {
      status: status,
      page: page,
      size: size,
    },
  });

  return response.data;
};

// 예약 불가능 날짜 조회
export const getImpossibleDateLists = async (
  spaceId: number,
): Promise<GetImpossibleDateListsResponse> => {
  const response = await GetAxiosInstance<GetImpossibleDateListsResponse>(
    `/reservation/available-dates`,
    {
      params: {
        spaceId: spaceId,
      },
    },
  );

  return response.data;
};
