import { create } from 'zustand';

import { ReservationData } from './type';

export const useReservationStore = create<{
  reservationData: ReservationData;
  setReservationData: (newStatus: ReservationData) => void;
}>((set) => ({
  reservationData: {
    id: 0,
    startDate: '',
    endDate: '',
  },
  setReservationData: (status) => set({ reservationData: status }),
}));
