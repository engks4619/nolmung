import axios from 'axios';

const HOST = 'http://nolmung.kr/api/';

const axiosApiInstance = axios.create({
  baseURL: HOST,
});

axiosApiInstance.interceptors.request.use(async config => {
  return config;
});

export default axiosApiInstance;
