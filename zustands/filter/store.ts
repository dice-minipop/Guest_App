import { create } from 'zustand';

import { SpaceFilterDTO } from '@/types/space';
import { AnnouncementFilterDTO } from '@/types/announcement';

// 공간 필터링 상태 관리 store
export const useSpaceFilteringStore = create<{
  initialFiltering: SpaceFilterDTO;
  filtering: SpaceFilterDTO;
  setFiltering: (newFilter: Partial<SpaceFilterDTO>) => void;
  clearFiltering: () => void;
}>((set) => ({
  initialFiltering: {
    city: '',
    district: '',
    minPrice: 0,
    maxPrice: 300000,
    maxCapacity: 0,
    sortBy: '',
  },
  filtering: {
    city: '',
    district: '',
    minPrice: 0,
    maxPrice: 300000,
    maxCapacity: 0,
    sortBy: '',
  },
  setFiltering: (newFilter) =>
    set((state) => ({
      filtering: {
        ...state.filtering,
        ...newFilter,
      },
    })),
  clearFiltering: () =>
    set({
      filtering: {
        city: '',
        district: '',
        minPrice: 0,
        maxPrice: 300000,
        maxCapacity: 0,
        sortBy: '',
      },
    }),
}));

// 공간 필터링 상태 관리 store
export const useAnnouncementFilteringStore = create<{
  initialFiltering: AnnouncementFilterDTO;
  filtering: AnnouncementFilterDTO;
  setFiltering: (newFilter: Partial<AnnouncementFilterDTO>) => void;
  clearFiltering: () => void;
}>((set) => ({
  initialFiltering: {
    city: '',
    district: '',
    targets: [],
    status: '',
  },
  filtering: {
    city: '',
    district: '',
    targets: [],
    status: '',
  },
  setFiltering: (newFilter) =>
    set((state) => ({
      filtering: {
        ...state.filtering,
        ...newFilter,
      },
    })),
  clearFiltering: () =>
    set({
      filtering: {
        city: '',
        district: '',
        targets: [],
        status: '',
      },
    }),
}));
