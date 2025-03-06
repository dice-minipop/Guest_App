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
}

export type GetReservationListsResponse = ReservationItem[];

export interface GetImpossibleDateListsResponse {
  reservedDates: {
    startDate: string;
    endDate: string;
  }[];
}
