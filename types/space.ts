export interface SpaceItem {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  pricePerDay: number;
  discountRate: number;
  discountPrice: number;
  capacity: number;
  likeCount: number;
}

export interface SpaceDetailItem {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
  category: string;
  openingTime: string;
  closingTime: string;
  capacity: number;
  tags: string[];
  pricePerDay: number;
  discountRate: number;
  details: string;
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  address: string;
  websiteUrl: string;
  contactNumber: string;
  facilityInfo: string;
  notice: string;
  likeCount: number;
}

export interface SpaceFilterDTO {
  city: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  maxCapacity: number;
  sortBy: string;
}
