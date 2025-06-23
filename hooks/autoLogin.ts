import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { reissueToken } from '@/server/auth/auth';
import { deleteToken, getRefreshToken, setAccessToken, setRefreshToken } from '@/utils/token';
// import { useGuestStateStore, useLoggedInStore } from '@/zustands/member/store';

export const useAutoLogin = (setAppLoaded: React.Dispatch<React.SetStateAction<boolean>>) => {
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          // setIsLoggedIn(false);
          await deleteToken();
          setAppLoaded(true);
          return;
        }

        try {
          const newTokens = await reissueToken({ refreshToken });
          console.log('토큰 재발급 실행', newTokens);

          await Promise.all([
            setAccessToken(newTokens.accessToken),
            setRefreshToken(newTokens.refreshToken),
          ]);

          router.replace('/(tabs)/space');
        } catch (error: any) {
          console.log(error);
          // setIsLoggedIn(false);
          await deleteToken();
          setAppLoaded(true);
          return;
        }

        // setIsLoggedIn(true);
        setAppLoaded(true);
      } catch (error: any) {
        // setIsLoggedIn(false);
        await deleteToken();
        setAppLoaded(true);
        return;
      }
    };
    checkLoggedIn();
  }, []);
};
