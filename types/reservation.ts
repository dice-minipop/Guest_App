export interface ReservationItem {
  reservationId: number;
  messageRoomId?: number;
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
