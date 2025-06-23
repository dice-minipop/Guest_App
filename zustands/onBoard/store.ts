import { create } from 'zustand';

// 이메일 도메인 선택 모달 store
export const useDomainModalStore = create<{
  isDomainModalOpen: boolean;
  setIsDomainModalOpen: (status: boolean) => void;
}>((set) => ({
  isDomainModalOpen: false,
  setIsDomainModalOpen: (status) => set({ isDomainModalOpen: status }),
}));
