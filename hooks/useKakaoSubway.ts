import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useKakaoSubway = (latitude: number, longitude: number) => {
  return useQuery({
    queryKey: [`kakao/subway`, latitude, longitude],
    queryFn: async () => {
      const response = await axios.get('https://dapi.kakao.com/v2/local/search/category', {
        headers: {
          Authorization: `KakaoAK ${process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY}`,
        },
        params: {
          category_group_code: 'SW8', // 지하철역
          x: longitude, // 경도
          y: latitude, // 위도
          sort: 'distance', // 거리순 정렬
          page: 1,
          size: 1,
        },
      });

      const firstPlace = response.data.documents[0];

      if (!firstPlace) {
        return null; // 또는 적절한 fallback 값
      }

      const { place_name, distance } = firstPlace;

      const [stationName, lineName] = place_name.split(' ');

      return { stationName, lineName, distance };
    },
  });
};
