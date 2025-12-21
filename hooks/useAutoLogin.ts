import { useEffect, useState } from 'react';

import { saveFcmTokenAfterAuth } from '@/hooks/auth/auth';
import { reissueToken } from '@/server/auth/auth';
import { deleteToken, getRefreshToken, setAccessToken, setRefreshToken } from '@/utils/token';
import { useAuthStore } from '@/zustands/auth/auth';

export const useAutoLogin = () => {
  const { setIsLoggedIn } = useAuthStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          await deleteToken();
          setLoading(false);
          return;
        }

        const newTokens = await reissueToken({ refreshToken });
        console.log('🔑 Access Token:', newTokens.accessToken);
        console.log('🔑 Refresh Token:', newTokens.refreshToken);

        await setAccessToken(newTokens.accessToken);
        await setRefreshToken(newTokens.refreshToken);

        await saveFcmTokenAfterAuth();
        setIsLoggedIn();
        console.log('✅ 자동 로그인 완료');
      } catch (error) {
        console.error('❌ 자동 로그인 실패:', error);
        await deleteToken();
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, [setIsLoggedIn]);

  return { loading };
};
