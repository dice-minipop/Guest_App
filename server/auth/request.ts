export interface CheckPhoneNumberRequest {
  phone: string;
}

export interface CheckEmailRequest {
  email: string;
}

export interface SignUpRequest {
  email: string;
  name: string;
  password: string;
  phone: string;
}

export interface ReissueTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  email: string;
  password: string;
  newPassword: string;
  token: string;
}

export interface RequestResetPasswordRequest {
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
