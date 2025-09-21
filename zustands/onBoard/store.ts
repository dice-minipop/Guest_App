import { create } from 'zustand';

import { SignUpStore } from './type';

export const useSignUpStore = create<{
  signUpStore: SignUpStore;
  setSignUpStore: (state: Partial<SignUpStore>) => void;

  setTargetGender: (genders: string[]) => void;
  setTargetAgeGroup: (ages: number[]) => void;
  setBrandName: (name: string) => void;
  setBrandDescription: (desc: string) => void;
  setLogoUrl: (url: string) => void;
  setImageUrls: (urls: string[]) => void;
}>((set) => ({
  signUpStore: {
    signUp: {
      email: '',
      name: '',
      password: '',
      phone: '',
      userRole: 1,
    },
    brandProfile: {
      targetGender: [],
      targetAgeGroup: [],
      name: '',
      description: '',
      logoUrl: '',
      imageUrls: [],
    },
  },
  setSignUpStore: (newState) =>
    set((state) => ({
      signUpStore: {
        ...state.signUpStore,
        ...newState,
      },
    })),

  // 브랜드 프로필 관련 setters
  setTargetGender: (targetGender: string[]) =>
    set((state) => ({
      signUpStore: {
        ...state.signUpStore,
        brandProfile: { ...state.signUpStore.brandProfile, targetGender },
      },
    })),
  setTargetAgeGroup: (targetAgeGroup: number[]) =>
    set((state) => ({
      signUpStore: {
        ...state.signUpStore,
        brandProfile: { ...state.signUpStore.brandProfile, targetAgeGroup },
      },
    })),
  setBrandName: (name: string) =>
    set((state) => ({
      signUpStore: {
        ...state.signUpStore,
        brandProfile: { ...state.signUpStore.brandProfile, name },
      },
    })),
  setBrandDescription: (description: string) =>
    set((state) => ({
      signUpStore: {
        ...state.signUpStore,
        brandProfile: { ...state.signUpStore.brandProfile, description },
      },
    })),
  setLogoUrl: (logoUrl: string) =>
    set((state) => ({
      signUpStore: {
        ...state.signUpStore,
        brandProfile: { ...state.signUpStore.brandProfile, logoUrl },
      },
    })),
  setImageUrls: (imageUrls: string[]) =>
    set((state) => ({
      signUpStore: {
        ...state.signUpStore,
        brandProfile: { ...state.signUpStore.brandProfile, imageUrls },
      },
    })),
}));

// 이메일 도메인 선택 모달 store
export const useDomainModalStore = create<{
  isDomainModalOpen: boolean;
  setIsDomainModalOpen: (status: boolean) => void;
}>((set) => ({
  isDomainModalOpen: false,
  setIsDomainModalOpen: (status) => set({ isDomainModalOpen: status }),
}));
