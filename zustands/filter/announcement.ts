import { create } from 'zustand';

import { AnnouncementFilter } from './type';

export const useAnnouncementFilterStore = create<{
  announcementFilter: AnnouncementFilter;
  setAnnouncementFilter: (newFilter: Partial<AnnouncementFilter>) => void;
  clearAnnouncementFilter: () => void;
}>((set) => ({
  announcementFilter: {},

  setAnnouncementFilter: (newFilter) =>
    set((state) => {
      const merged = { ...state.announcementFilter, ...newFilter };

      const cleaned = Object.fromEntries(
        Object.entries(merged).filter(([_, value]) => {
          // undefined 또는 빈 배열이면 제거
          if (value === undefined) return false;
          if (Array.isArray(value) && value.length === 0) return false;
          return true;
        }),
      );

      return { announcementFilter: cleaned };
    }),

  clearAnnouncementFilter: () => set(() => ({ announcementFilter: {} })),
}));
