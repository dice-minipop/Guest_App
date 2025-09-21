import axios, { AxiosInstance } from 'axios';

import { deleteToken, getAccessToken, getRefreshToken, setAccessToken } from '@/utils/token';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// JWT 토큰 기반 API 요청
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      throw new Error('토큰 없음');
    }

    config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// 토큰 관련 에러 처리
// response interceptor 수정 예시
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // refresh 요청
        const refreshToken = await getRefreshToken();
        const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/v1/auth/reissue`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        await setAccessToken(newAccessToken);

        // 원래 요청 retry
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        await deleteToken();
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
