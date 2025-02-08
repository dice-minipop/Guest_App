export interface SignUpResponse {
  email: string;
  name: string;
  userRole: string;
}

export interface LoginResponse {
  user: {
    email: string;
    name: string;
    userRole: any;
  };
  token: {
    accessToken: string;
    refreshToken: string;
  };
}
