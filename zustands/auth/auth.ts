import { create } from 'zustand';

type AuthStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: () => void;
  setIsLoggedOut: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: () => {
    set((state) => {
      return {
        ...state,
        isLoggedIn: true,
      };
    });
  },
  setIsLoggedOut: () => {
    set((state) => {
      return {
        ...state,
        isLoggedIn: false,
      };
    });
  },
}));
