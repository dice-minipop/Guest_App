import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react';

import useFcm from '@/hooks/useFCM';
import { ensureNotificationHandler } from '@/utils/expoNotification';
import { useAuthStore } from '@/zustands/auth/auth';

interface FCMContextType {
  token: string | null;
}

const FCMContext = createContext<FCMContextType>({ token: null });

interface FCMProviderProps {
  children: ReactNode;
  appLoaded: boolean;
}

export const useFCM = () => useContext(FCMContext);

export default function FCMProvider({ children, appLoaded }: FCMProviderProps) {
  const { isLoggedIn } = useAuthStore();
  const { token, register, unregister } = useFcm();
  const isRegisteringRef = useRef(false);

  useEffect(() => {
    ensureNotificationHandler();
  }, []);

  useEffect(() => {
    if (!appLoaded || isRegisteringRef.current) return;

    const run = async () => {
      try {
        isRegisteringRef.current = true;

        if (isLoggedIn) {
          await register();
        } else {
          await unregister();
        }
      } catch (e) {
        console.error('❌ FCM Provider 오류:', e);
      } finally {
        isRegisteringRef.current = false;
      }
    };

    run();
  }, [isLoggedIn, appLoaded]);

  // 포그라운드 메시지 리스너
  useEffect(() => {
    if (!appLoaded) return;

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const { title, body } = remoteMessage.notification || {};

      await Notifications.scheduleNotificationAsync({
        content: {
          title: title ?? '알림',
          body: body ?? '',
          sound: true,
          data: remoteMessage.data ?? {},
        },
        trigger: null,
      });
    });

    return () => {
      unsubscribe();
    };
  }, [appLoaded]);

  return <FCMContext.Provider value={{ token }}>{children}</FCMContext.Provider>;
}
