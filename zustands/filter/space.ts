import { create } from 'zustand';

import { SpaceFilter } from './type';

export const useSpaceFilterStore = create<{
  spaceFilter: SpaceFilter;
  setSpaceFilter: (newFilter: Partial<SpaceFilter>) => void;
  clearSpaceFilter: () => void;
}>((set) => ({
  spaceFilter: {},

  setSpaceFilter: (newFilter) =>
    set((state) => {
      const merged = { ...state.spaceFilter, ...newFilter };

      const cleaned = Object.fromEntries(
        Object.entries(merged).filter(([_, value]) => {
          // undefined 또는 빈 배열이면 제거
          if (value === undefined) return false;
          if (Array.isArray(value) && value.length === 0) return false;
          return true;
        }),
      );

      return { spaceFilter: cleaned };
    }),

  clearSpaceFilter: () => set(() => ({ spaceFilter: {} })),
}));
