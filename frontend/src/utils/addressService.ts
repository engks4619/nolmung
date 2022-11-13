import Config from 'react-native-config';
import axios from 'axios';
import {Alert} from 'react-native';

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
      headers,
    });
    return response;
  } catch (error: any) {
    Alert.alert(
      `에러코드 ${error.response.status}`,
      '사용자 주소를 불러오는데 실패했습니다.',
    );
  }
};
