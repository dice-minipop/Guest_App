import { create } from 'zustand';

// 로그인 상태 관리 store
export const useLoggedInStore = create<{
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));
