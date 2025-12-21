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
  sendEmailVerify,
  signUp,
  updatePassword,
  withdraw,
} from '@/server/auth/auth';
import {
  CheckEmailRequest,
  CheckPhoneNumberRequest,
  LoginRequest,
  ResetPasswordRequest,
  SendEmailVerifyRequest,
  SignUpRequest,
  UpdatePasswordRequest,
} from '@/server/auth/request';
import { LoginResponse, ResetPasswordResponse } from '@/server/auth/response';
import { saveFCMToken } from '@/server/fcm/fcm';
import { getFcmToken, getFcmTokenFromFirebase } from '@/utils/notification/fcmTokenUtil';
import { deleteToken, setAccessToken, setRefreshToken } from '@/utils/token';
import { useAuthStore } from '@/zustands/auth/auth';

export const saveFcmTokenAfterAuth = async () => {
  try {
    let fcmToken = await getFcmToken();

    if (!fcmToken) {
      fcmToken = await getFcmTokenFromFirebase();
    }

    if (!fcmToken) {
      return;
    }

    await saveFCMToken({ fcmToken: fcmToken });
    console.log('✅ FCM 토큰 서버 저장 완료');
  } catch (error) {
    console.error('❌ FCM 토큰 서버 저장 실패:', error);
  }
};
//
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
    mutationFn: async (data: SignUpRequest) => {
      // 회원가입 API 호출
      await signUp(data);
      // 회원가입 성공 후 자동 로그인 (토큰 획득)
      const loginResponse = await login({ email: data.email, password: data.password });
      return loginResponse;
    },
    onSuccess: async (loginResponse: LoginResponse) => {
      // 로그인 성공 후 토큰만 저장 (로그인 상태는 브랜드 프로필 등록 완료 후 전환)
      console.log('🔑 Access Token:', loginResponse.token.accessToken);
      console.log('🔑 Refresh Token:', loginResponse.token.refreshToken);

      await setAccessToken(loginResponse.token.accessToken);
      await setRefreshToken(loginResponse.token.refreshToken);
      // setIsLoggedIn()은 브랜드 프로필 등록 완료 후 호출
      await saveFcmTokenAfterAuth();
      console.log('✅ 회원가입 완료');
      router.push(`/(onBoarding)/brandProfile`);
    },
    onError: (error) => {
      console.error('❌ 회원가입 실패:', error);
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

// 이메일 인증 전송
export const useSendResetEmail = (handleSend: () => void) => {
  return useMutation({
    mutationFn: (data: SendEmailVerifyRequest) => sendEmailVerify(data),
    onSuccess: () => {
      handleSend();
      Alert.alert('이메일이 전송되었습니다.');
    },
    onError: (error: any) => {
      console.error('❌ 이메일 전송 실패:', error);
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
      console.error('❌ 비밀번호 재설정 실패:', error);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { setIsLoggedOut } = useAuthStore();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: async () => {
      router.replace('/');
      setIsLoggedOut();
      await deleteToken();
      console.log('✅ 로그아웃 완료');
    },
    onError: (error) => {
      console.error('❌ 로그아웃 실패:', error);
    },
  });
};

// 이메일 로그인
export const useLogin = (isGuestMode: boolean) => {
  const { setIsLoggedIn } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: async (response: LoginResponse) => {
      if (isGuestMode) {
        console.log('🔑 Access Token:', response.token.accessToken);
        await setAccessToken(response.token.accessToken);
        console.log('✅ 게스트 로그인 완료');
      } else {
        console.log('🔑 Access Token:', response.token.accessToken);
        console.log('🔑 Refresh Token:', response.token.refreshToken);
        await setAccessToken(response.token.accessToken);
        await setRefreshToken(response.token.refreshToken);
        await saveFcmTokenAfterAuth();
        setIsLoggedIn();
        console.log('✅ 로그인 완료');
      }
    },
    onError: (error: any) => {
      console.error('❌ 로그인 실패:', error);
    },
  });
};

// 회원 탈퇴
export const useWithdraw = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthStore();

  return useMutation({
    mutationFn: () => withdraw(),
    onSuccess: async () => {
      setIsLoggedIn();
      await deleteToken();
      router.replace('/');
      console.log('✅ 회원 탈퇴 완료');
    },
    onError: (error) => {
      console.error('❌ 회원 탈퇴 실패:', error);
    },
  });
};
