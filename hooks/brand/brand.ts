import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { createBrand, getMyBrandInfo, updateBrand } from '@/server/brand/brand';
import { UpdateBrandRequest } from '@/server/brand/request';

export const useUpdateBrand = () => {
  return useMutation({
    mutationFn: (data: UpdateBrandRequest) => updateBrand(1, data),
  });
};

export const useCreateBrand = () => {
  return useMutation({
    mutationFn: (data: UpdateBrandRequest) => createBrand(data),
  });
};

export const useGetMyBrandInfo = () => {
  return useSuspenseQuery({
    queryKey: [`/brand/my`],
    queryFn: () => getMyBrandInfo(),
  });
};
