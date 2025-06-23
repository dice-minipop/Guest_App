import { PostAxiosInstance } from '@/axios/axios.method';
import { GuestPostAxiosInstance } from '@/axios/guest.axios.method';

import {
  CheckEmailRequest,
  CheckPhoneNumberRequest,
  LoginRequest,
  ReissueTokenRequest,
  SignUpRequest,
  UpdatePasswordRequest,
  ResetPasswordRequest,
  SendEmailVerifyRequest,
  VerifyEmailRequest,
} from './request';
import {
  LoginResponse,
  ReissueTokenResponse,
  ResetPasswordResponse,
  SignUpResponse,
  VerifyEmailResponse,
} from './response';

// 회원 탈퇴
export const withdraw = async () => {
  const response = await PostAxiosInstance(`/auth/withdraw`);

  return response.data;
};

// 이메일 인증 전송
export const sendEmailVerify = async (data: SendEmailVerifyRequest) => {
  const response = await GuestPostAxiosInstance(`/auth/verify`, data);

  return response.data;
};

// 이메일 인증 확인
export const verifyEmail = async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
  const response = await GuestPostAxiosInstance<VerifyEmailResponse>(`/auth/verify/code`, data);

  return response.data;
};

// 휴대폰 번호 중복 확인
export const checkPhoneNumber = async (data: CheckPhoneNumberRequest) => {
  const response = await GuestPostAxiosInstance(`/auth/validate/phone`, data);

  return response.data;
};

// 이메일 중복 확인
export const checkEmail = async (data: CheckEmailRequest) => {
  const response = await GuestPostAxiosInstance(`/auth/validate/email`, data);

  return response.data;
};

// 회원가입
export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await GuestPostAxiosInstance<SignUpResponse>(`/auth/signup`, data);

  return response.data;
};

// 토큰 재발급
export const reissueToken = async (data: ReissueTokenRequest): Promise<ReissueTokenResponse> => {
  const response = await PostAxiosInstance<ReissueTokenResponse>(`/auth/reissue`, data);

  return response.data;
};

// 비밀번호 변경
export const updatePassword = async (data: UpdatePasswordRequest) => {
  const response = await PostAxiosInstance(`/auth/password-update`, data);

  return response.data;
};

// 비밀번호 재설정
export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const response = await GuestPostAxiosInstance<ResetPasswordResponse>(
    `/auth/password-reset`,
    data,
  );

  return response.data;
};

// 로그아웃
export const logout = async () => {
  const response = await PostAxiosInstance(`/auth/logout`);

  return response.data;
};

// 이메일 로그인
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await GuestPostAxiosInstance<LoginResponse>(`/auth/login`, data);

  return response.data;
};
