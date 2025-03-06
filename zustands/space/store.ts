import { create } from 'zustand';

// 선택한 공간 정보 store
export const useSpaceDataStore = create<{
  spaceName: string;
  setSpaceName: (status: string) => void;
}>((set) => ({
  spaceName: '',
  setSpaceName: (status) => set({ spaceName: status }),
}));
