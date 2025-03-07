import { PagenationDTO } from '@/types/page';

export interface CreateReservationResponse {
  id: number;
  name: string;
  email: string;
  startDate: string;
  endDate: string;
  message: string;
}

export interface ReservationItem {
  reservationId: number;
  spaceName: string;
  startDate: string;
  endDate: string;
  message: string;
  status: string;
  city: string;
  district: string;
  capacity: number;
  size: number;
  totalPrice: number;
  spaceImage: string;
}

export type GetReservationListsResponse = PagenationDTO<ReservationItem>;

export interface GetImpossibleDateListsResponse {
  reservedDates: {
    startDate: string;
    endDate: string;
  }[];
}
