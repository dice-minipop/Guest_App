export interface SignUpStore {
  signUp: {
    email: string;
    name: string;
    password: string;
    phone?: string;
    userRole: 1 | 0;
  };
  brandProfile: {
    targetGender: string[];
    targetAgeGroup: string[];
    name: string;
    description: string;
    logoUrl: string;
    imageUrls: string[];
  };
}
