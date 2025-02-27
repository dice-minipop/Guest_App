import { create } from 'zustand';

// 로그인 상태 관리 store
export const useLoggedInStore = create<{
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));

// 게스트 상태 관리 store
export const useGuestStateStore = create<{
  isGuestMode: boolean;
  setIsGuestMode: (status: boolean) => void;
}>((set) => ({
  isGuestMode: false,
  setIsGuestMode: (status) => set({ isGuestMode: status }),
}));
