export interface SpaceItem {
  id: number;
  name: string;
  address: string;
  city: string;
  district: string;
  imageUrl: string;
  pricePerDay: number;
  discountRate: number;
  discountPrice: number;
  capacity: number;
  size: number;
  likeCount: number;
  isLiked: boolean;
  isActivated: boolean;
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
  detailAddress: string | null;
  websiteUrl: string;
  contactNumber: string;
  facilityInfo: string;
  notice: string;
  likeCount: number;
  isLiked: boolean;
  messageRoomId: number | null;
}

export interface SpaceFilterDTO {
  city: string;
  district: string | null;
  minPrice: number;
  maxPrice: number;
  minCapacity: number;
  maxCapacity: number;
  sortBy: string;
}

export interface SpaceDetailComponentProps {
  data: SpaceDetailItem;
}
