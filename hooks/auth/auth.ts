import { checkEmail, checkPhoneNumber, login, signUp } from '@/server/auth/auth';
import {
  CheckEmailRequest,
  CheckPhoneNumberRequest,
  LoginRequest,
  SignUpRequest,
} from '@/server/auth/request';
import { LoginResponse } from '@/server/auth/response';
import { setAccessToken, setRefreshToken } from '@/utils/token';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

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
  return useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
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
