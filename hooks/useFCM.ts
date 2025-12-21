import messaging from '@react-native-firebase/messaging';
import { useRef } from 'react';

import { saveFCMToken } from '@/server/fcm/fcm';
import {
  getFcmToken,
  getFcmTokenFromFirebase,
  requestUserPermission,
  setFcmToken,
} from '@/utils/notification/fcmTokenUtil';
import { getAccessToken } from '@/utils/token';

export interface UseFcmReturn {
  token: string | null;
  register: () => Promise<void>;
  unregister: () => Promise<void>;
}

export default function useFcm(): UseFcmReturn {
  const fgSub = useRef<(() => void) | undefined>(undefined);
  const tokenRef = useRef<string | null>(null);
  const retryIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const register = async () => {
    try {
      // 기존 리스너 제거
      if (fgSub.current) {
        fgSub.current();
      }
      fgSub.current = undefined;

      // 권한 요청
      const hasPermission = await requestUserPermission();
      if (!hasPermission) {
        throw new Error('FCM 권한이 없습니다');
      }

      // FCM 토큰 가져오기
      let token = await getFcmToken();
      if (!token) {
        token = await getFcmTokenFromFirebase();
        if (!token) {
          console.warn('⚠️ FCM 토큰 대기 중 (APNS 준비 중)');
        }
      }

      // 토큰이 있으면 저장 및 서버 전송
      if (token) {
        console.log('📱 FCM 토큰:', token);
        tokenRef.current = token;

        // 로그인 상태일 때만 서버에 저장
        const accessToken = await getAccessToken();
        if (accessToken) {
          try {
            await saveFCMToken({ fcmToken: token });
            console.log('✅ FCM 토큰 서버 저장 완료');
          } catch (error) {
            console.error('❌ FCM 토큰 서버 저장 실패:', error);
          }
        }
      }

      // 토큰 갱신 리스너 등록
      fgSub.current = messaging().onTokenRefresh(async (newToken) => {
        console.log('🔄 FCM 토큰 갱신:', newToken);
        tokenRef.current = newToken;
        await setFcmToken(newToken);

        // 주기적 재시도 중지
        if (retryIntervalRef.current) {
          clearInterval(retryIntervalRef.current);
          retryIntervalRef.current = null;
        }

        // 로그인 상태일 때만 서버에 저장
        const accessToken = await getAccessToken();
        if (accessToken) {
          try {
            await saveFCMToken({ fcmToken: newToken });
            console.log('✅ 갱신된 FCM 토큰 서버 저장 완료');
          } catch (error) {
            console.error('❌ 갱신된 FCM 토큰 서버 저장 실패:', error);
          }
        }
      });

      // 토큰이 없으면 주기적으로 재시도
      if (!token) {
        if (retryIntervalRef.current) {
          clearInterval(retryIntervalRef.current);
        }

        let retryCount = 0;
        const maxRetries = 24; // 24 * 5초 = 2분

        retryIntervalRef.current = setInterval(async () => {
          retryCount++;

          try {
            const newToken = await getFcmTokenFromFirebase();
            if (newToken) {
              console.log('✅ FCM 토큰 재시도 성공:', newToken);
              tokenRef.current = newToken;

              // 재시도 중지
              if (retryIntervalRef.current) {
                clearInterval(retryIntervalRef.current);
                retryIntervalRef.current = null;
              }

              // 서버에 저장
              const accessToken = await getAccessToken();
              if (accessToken) {
                try {
                  await saveFCMToken({ fcmToken: newToken });
                  console.log('✅ FCM 토큰 서버 저장 완료');
                } catch (error) {
                  console.error('❌ FCM 토큰 서버 저장 실패:', error);
                }
              }
            } else if (retryCount >= maxRetries) {
              console.warn('⚠️ FCM 토큰 재시도 제한 도달');
              if (retryIntervalRef.current) {
                clearInterval(retryIntervalRef.current);
                retryIntervalRef.current = null;
              }
            }
          } catch (error) {
            if (retryCount >= maxRetries) {
              if (retryIntervalRef.current) {
                clearInterval(retryIntervalRef.current);
                retryIntervalRef.current = null;
              }
            }
          }
        }, 5000);
      }

      console.log('✅ FCM 등록 완료');
    } catch (error) {
      console.error('❌ FCM 등록 실패:', error);
      throw error;
    }
  };

  const unregister = async () => {
    try {
      // 주기적 재시도 중지
      if (retryIntervalRef.current) {
        clearInterval(retryIntervalRef.current);
        retryIntervalRef.current = null;
      }

      const { deactivateFcmToken } = await import('@/utils/notification/fcmTokenUtil');
      await deactivateFcmToken();
      console.log('✅ FCM 등록 해제 완료');
    } catch (error) {
      console.error('❌ FCM 등록 해제 실패:', error);
    } finally {
      if (fgSub.current) {
        fgSub.current();
      }
      fgSub.current = undefined;
      tokenRef.current = null;
    }
  };

  return { token: tokenRef.current, register, unregister };
}
