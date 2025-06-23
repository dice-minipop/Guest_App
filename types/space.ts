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
  badge?: string;
}

export interface SpaceDetailItem {
  id: number;
  name: string;
  nearestSubway: {
    lineNumber: string;
    stationName: string;
    distance: number;
  };
  analysis: {
    title: string;
    description: string;
  };
  imageUrls: string[];
  openingTime: string;
  closingTime: string;
  size: number;
  tags: string[];
  pricePerDay: number;
  discountRate: number;
  discountPrice: number;
  details: string;
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  address: string;
  detailAddress: string | null;
  contactNumber: string;
  notices: string[];
  likeCount: number;
  isLiked: boolean;
  messageRoomId: number | null;
  isActivated: boolean;
  facilityInfos: {
    key: string;
    number: number;
  }[];
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
