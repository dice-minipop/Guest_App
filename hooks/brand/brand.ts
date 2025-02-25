import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { createBrand, getMyBrandInfo, updateBrand } from '@/server/brand/brand';
import { UpdateBrandRequest } from '@/server/brand/request';

export const useUpdateBrand = (infoRefetch: any, brandRefetch: any) => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ brandId, data }: { brandId: number; data: UpdateBrandRequest }) =>
      updateBrand(brandId, data),
    onSuccess: () => {
      console.log('수정 클릭됨');
      infoRefetch();
      brandRefetch();
      router.back();
    },
    onError: (error) => {
      console.log('브랜드 업데이트 실패', error.message);
    },
  });
};

export const useCreateBrand = (infoRefetch: any, brandRefetch: any) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdateBrandRequest) => createBrand(data),
    onSuccess: () => {
      console.log('생성 클릭됨');
      infoRefetch();
      brandRefetch();
      router.back();
    },
    onError: (error) => {
      console.log('브랜드 생성 실패', error.message);
    },
  });
};

export const useGetMyBrandInfo = () => {
  return useSuspenseQuery({
    queryKey: [`/brand/list`],
    queryFn: () => getMyBrandInfo(),
  });
};
