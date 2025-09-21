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

interface CreateReservation {
  spaceId: number;
  startDate: string;
  endDate: string;
  eventName: string;
  eventContent: string;
  fileList: string[];
  etcRequest: string;
}

interface CreateReservationStore {
  reservationData: CreateReservation;
  setReservationData: <K extends keyof CreateReservation>(
    key: K,
    value: CreateReservation[K],
  ) => void;
}

export const useCreateReservationStore = create<CreateReservationStore>((set) => ({
  reservationData: {
    spaceId: 0,
    startDate: '',
    endDate: '',
    eventName: '',
    eventContent: '',
    fileList: [],
    etcRequest: '',
  },

  setReservationData: (key, value) =>
    set((state) => ({
      reservationData: {
        ...state.reservationData,
        [key]: value,
      },
    })),
}));
