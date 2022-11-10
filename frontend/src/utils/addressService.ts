import Config from 'react-native-config';
import axios from 'axios';

const API_KEY = Config.KAKAO_API_KEY;
const KAKAO_URL = Config.KAKAO_URL;
const HOST = KAKAO_URL;

const axiosApiInstance = axios.create({
  baseURL: HOST,
});

axiosApiInstance.interceptors.request.use(async config => {
  return config;
});

const headers = {Authorization: 'KakaoAK ' + API_KEY};

export const getTextAddress = async (
  lat: number,
  lng: number,
): Promise<any> => {
  const url = KAKAO_URL + `/v2/local/geo/coord2address?x=${lng}&y=${lat}`;
  try {
    const response = await axiosApiInstance.get(url, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.log('kakao api error!!', error);
  }
};
