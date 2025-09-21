import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { createBrand, getMyBrandInfo, updateBrand } from '@/server/brand/brand';
import { UpdateBrandRequest } from '@/server/brand/request';

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

export const useGetMyBrandInfo = () => {
  return useQuery({
    queryKey: [`/brand/list`],
    queryFn: () => getMyBrandInfo(),
  });
};
