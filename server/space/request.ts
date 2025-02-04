export interface GetFilteredSpaceListsRequest {
  city: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  maxCapacity: number;
  sortBy: string;
}
