import { useMutation } from '@tanstack/react-query';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

import {
  checkEmail,
  checkPhoneNumber,
  login,
  logout,
  resetPassword,
  sendResetEmail,
  signUp,
  updatePassword,
  withdraw,
} from '@/server/auth/auth';
import {
  CheckEmailRequest,
  CheckPhoneNumberRequest,
  LoginRequest,
  ResetPasswordRequest,
  SendResetEmailRequest,
  SignUpRequest,
  UpdatePasswordRequest,
} from '@/server/auth/request';
import { LoginResponse, ResetPasswordResponse } from '@/server/auth/response';
import { deleteToken, setAccessToken, setRefreshToken } from '@/utils/token';
import { useLoggedInStore } from '@/zustands/member/store';

// 휴대폰 번호 중복 확인
export const useCheckPhoneNumber = () => {
  return useMutation({
    mutationFn: (data: CheckPhoneNumberRequest) => checkPhoneNumber(data),
    // onError: (error: any) => {
    //   if (error.message === 'Request failed with status code 409') {
    //     Alert.alert('이미 사용중인 휴대폰 번호입니다!');
    //   }
    // },
  });
};

// 이메일 중복 확인
export const useCheckEmail = () => {
  return useMutation({
    mutationFn: (data: CheckEmailRequest) => checkEmail(data),
    // onError: (error: any) => {
    //   if (error.message === 'Request failed with status code 409') {
    //     Alert.alert('이미 사용중인 이메일입니다!');
    //   }
    // },
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
    onError: (error) => {
      console.log(error);
    },
  });
};

// 비밀번호 변경
export const useUpdatePassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdatePasswordRequest) => updatePassword(data),
    onSuccess: () => {
      Alert.alert('비밀번호 변경이 완료되었습니다.');
      router.back();
    },
  });
};

// 비밀번호 재설정 이메일 전송
export const useSendResetEmail = (handleSend: () => void) => {
  return useMutation({
    mutationFn: (data: SendResetEmailRequest) => sendResetEmail(data),
    onSuccess: () => {
      handleSend();
      Alert.alert('이메일이 전송되었습니다.');
    },
    onError: (error: any) => {
      console.log(error);
      console.log(error.message);
    },
  });
};

// 비밀번호 재설정
export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => resetPassword(data),
    onSuccess: async (response: ResetPasswordResponse) => {
      Alert.alert(`임시 비밀번호는 ${response.tempPassword}입니다. 클립보드에 복사되었습니다.`);
      await Clipboard.setStringAsync(response.tempPassword);

      router.replace('/');
    },
    onError: (error) => {
      console.log(error);
      console.log(error.message);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useLoggedInStore();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: async () => {
      router.replace('/');
      setIsLoggedIn(false);
      await deleteToken();
    },
    onError: (error) => {
      console.log(error);
    },
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

// 회원 탈퇴
export const useWithdraw = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useLoggedInStore();

  return useMutation({
    mutationFn: () => withdraw(),
    onSuccess: async () => {
      await deleteToken();
      setIsLoggedIn(false);
      router.replace('/');
    },
  });
};
