import { create } from 'zustand';

import { SpaceFilterDTO } from '@/types/space';

// 필터링 상태 관리 store
export const useFilteringStore = create<{
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
