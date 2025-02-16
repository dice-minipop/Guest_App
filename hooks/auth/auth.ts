import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

import {
  changePassword,
  checkEmail,
  checkPhoneNumber,
  login,
  requestResetPassword,
  signUp,
} from '@/server/auth/auth';
import {
  ChangePasswordRequest,
  CheckEmailRequest,
  CheckPhoneNumberRequest,
  LoginRequest,
  RequestResetPasswordRequest,
  SignUpRequest,
} from '@/server/auth/request';
import { LoginResponse } from '@/server/auth/response';
import { setAccessToken, setRefreshToken } from '@/utils/token';

// 휴대폰 번호 중복 확인
export const useCheckPhoneNumber = () => {
  return useMutation({
    mutationFn: (data: CheckPhoneNumberRequest) => checkPhoneNumber(data),
    onError: (error: any) => {
      if (error.message === 'Request failed with status code 409') {
        Alert.alert('이미 사용중인 휴대폰 번호입니다!');
      }
    },
  });
};

// 이메일 중복 확인
export const useCheckEmail = () => {
  return useMutation({
    mutationFn: (data: CheckEmailRequest) => checkEmail(data),
    onError: (error: any) => {
      if (error.message === 'Request failed with status code 409') {
        Alert.alert('이미 사용중인 이메일입니다!');
      }
    },
  });
};

// 회원가입
export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
    onSuccess: () => {
      Alert.alert('회원가입이 완료되었습니다!');
      router.back();
    },
  });
};

// 비밀번호 재설정
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword(data),
  });
};

// 비밀번호 재설정 이메일 전송
export const useRequestResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RequestResetPasswordRequest) => requestResetPassword(data),
    onSuccess: () => router.push('/(findPassword)/success'),
  });
};

// 이메일 로그인
export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: async (response: LoginResponse) => {
      console.log(response.token.accessToken);

      await setAccessToken(response.token.accessToken);
      await setRefreshToken(response.token.refreshToken);

      console.log(response.token.accessToken);
      router.push('/(tabs)/space');
    },
  });
};
