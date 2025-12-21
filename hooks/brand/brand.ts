import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { createBrand, getMyBrandInfo, updateBrand } from '@/server/brand/brand';
import { CreateBrandRequest, UpdateBrandRequest } from '@/server/brand/request';
import { useAuthStore } from '@/zustands/auth/auth';

export const useUpdateBrand = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ brandId, data }: { brandId: number; data: UpdateBrandRequest }) =>
      updateBrand(brandId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/brand/list`] });
      queryClient.invalidateQueries({ queryKey: [`/guest/info`] });
      router.back();
    },
    onError: (error) => {
      console.log('브랜드 업데이트 실패', error.message);
    },
  });
};

export const useCreateBrand = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBrandRequest) => createBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/brand/list`] });
      queryClient.invalidateQueries({ queryKey: [`/guest/info`] });
      router.back();
    },
    onError: (error) => {
      console.log('브랜드 생성 실패', error.message);
    },
  });
};

// 회원가입 후 브랜드 프로필 등록 (회원가입 완료 후 호출, 토큰은 있지만 로그인 상태는 아님)
export const useCreateBrandProfile = () => {
  const queryClient = useQueryClient();
  const { setIsLoggedIn } = useAuthStore();

  return useMutation({
    mutationFn: async (brandData: CreateBrandRequest) => {
      // 브랜드 프로필 등록 (회원가입 시 토큰이 저장되어 있음)
      await createBrand(brandData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/brand/list`] });
      queryClient.invalidateQueries({ queryKey: [`/guest/info`] });

      // 브랜드 프로필 등록 완료 후 로그인 상태로 전환 및 메인 화면으로 이동
      setIsLoggedIn();
    },
    onError: (error) => {
      console.log('브랜드 프로필 등록 실패', error);
    },
  });
};

export const useGetMyBrandInfo = () => {
  return useQuery({
    queryKey: [`/brand/list`],
    queryFn: () => getMyBrandInfo(),
  });
};
