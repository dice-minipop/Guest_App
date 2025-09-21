import { useEffect, useState } from 'react';

import { reissueToken } from '@/server/auth/auth';
import { deleteToken, getRefreshToken, setAccessToken, setRefreshToken } from '@/utils/token';
import { useAuthStore } from '@/zustands/auth/auth';

export const useAutoLogin = () => {
  const { setIsLoggedIn } = useAuthStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      console.log('자동 로그인 시작');

      try {
        const refreshToken = await getRefreshToken();
        console.log('리프레쉬 토큰: ', refreshToken);

        if (!refreshToken) {
          console.log('리프레쉬 없음');
          await deleteToken();
          setLoading(false);
          return;
        }

        console.log('리프레쉬 있음');

        const newTokens = await reissueToken({ refreshToken });
        console.log('새로 발급 받은 토큰들: ', newTokens);

        await setAccessToken(newTokens.accessToken);
        await setRefreshToken(newTokens.refreshToken);

        setIsLoggedIn();
      } catch (err) {
        await deleteToken();
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  return { loading };
};
