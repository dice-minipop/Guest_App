export interface BrandInfo {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  imageUrls: string[];
  homepageUrl: string;
}

export type GetMyBrandInfoResponse = BrandInfo[] | [];
