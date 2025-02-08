import { PostAxiosInstance } from '@/axios/axios.method';
import { GuestPostAxiosInstance } from '@/axios/guest.axios.method';
import {
  CheckEmailRequest,
  CheckPhoneNumberRequest,
  LoginRequest,
  ReissueTokenRequest,
  RequestResetPasswordRequest,
  ResetPasswordRequest,
  SignUpRequest,
} from './request';
import { LoginResponse, SignUpResponse } from './response';

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
  const response = await GuestPostAxiosInstance<SignUpResponse>(`/auth/sigup`, data);

  return response.data;
};

// 토큰 재발급
export const reissueToken = async (data: ReissueTokenRequest) => {
  const response = await PostAxiosInstance(`/auth/reissue`, data);

  return response.data;
};

// 비밀번호 재설정
export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await PostAxiosInstance(`/auth/password-reset/reset`, data);

  return response.data;
};

// 비밀번호 재설정 이메일 전송
export const requestResetPassword = async (data: RequestResetPasswordRequest) => {
  const response = await PostAxiosInstance(`/auth/password-reset/request`, data);

  return response.data;
};

// 로그아웃
export const logout = async () => {
  const response = await PostAxiosInstance(`/auth/login`);

  return response.data;
};

// 이메일 로그인
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await GuestPostAxiosInstance<LoginResponse>(`/auth/login`, data);

  return response.data;
};
