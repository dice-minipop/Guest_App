import { create } from 'zustand';

import { AnnouncementFilterDTO } from '@/types/announcement';
import { SpaceFilterDTO } from '@/types/space';

// 공간 필터링 상태 관리 store
export const useSpaceFilteringStore = create<{
  isRefetched: boolean;
  setIsRefetched: (status: boolean) => void;
  filtering: Partial<SpaceFilterDTO>;
  setFiltering: <K extends keyof SpaceFilterDTO>(key: K, value: SpaceFilterDTO[K]) => void;
  deleteFiltering: (key: keyof SpaceFilterDTO) => void;
  clearFiltering: () => void;
}>((set) => ({
  isRefetched: false,

  setIsRefetched: (status) => set({ isRefetched: status }),

  filtering: {},

  setFiltering: (key, value) =>
    set((state) => ({
      filtering: {
        ...state.filtering,
        [key]: value,
      },
    })),

  deleteFiltering: (key) =>
    set((state) => {
      const newFiltering = { ...state.filtering };
      delete newFiltering[key];
      return { filtering: newFiltering };
    }),

  clearFiltering: () =>
    set({
      filtering: {},
    }),
}));

// 공고 필터링 상태 관리 store
export const useAnnouncementFilteringStore = create<{
  isRefetched: boolean;
  setIsRefetched: (status: boolean) => void;
  filtering: Partial<AnnouncementFilterDTO>;
  setFiltering: <K extends keyof AnnouncementFilterDTO>(
    key: K,
    value: AnnouncementFilterDTO[K],
  ) => void;
  deleteFiltering: (key: keyof AnnouncementFilterDTO) => void;
  clearFiltering: () => void;
}>((set) => ({
  isRefetched: false,

  setIsRefetched: (status) => set({ isRefetched: status }),

  filtering: {},

  setFiltering: (key, value) =>
    set((state) => ({
      filtering: {
        ...state.filtering,
        [key]: value,
      },
    })),

  deleteFiltering: (key) =>
    set((state) => {
      const newFiltering = { ...state.filtering };
      delete newFiltering[key];
      return { filtering: newFiltering };
    }),

  clearFiltering: () =>
    set({
      filtering: {},
    }),
}));
