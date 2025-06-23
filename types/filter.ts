export interface SpaceFiltering {
  city: string | undefined;
  district: string | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minCapacity: number | undefined;
  maxCapacity: number | undefined;
  sortBy: string | undefined;
}

export interface AnnouncementFiltering {
  city: string | undefined;
  district: string | undefined;
  targets: string[] | undefined;
  status: string | undefined;
}
