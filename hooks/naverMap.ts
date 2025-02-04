import axios from 'axios';

// 주소를 기반으로 네이버로부터 위도와 경도를 얻는 메서드
export const getGeocode = async (location: string) => {
  try {
    const response = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${location}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': process.env.EXPO_PUBLIC_NMFClientId,
          'X-NCP-APIGW-API-KEY': process.env.EXPO_PUBLIC_NMFClientSecret,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
