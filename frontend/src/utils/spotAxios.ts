import axios from 'axios';

const HOST = 'http://nolmung.kr';
// const SPOT_PORT = '8000';

const SPOT_URI = `${HOST}/api`;

const axiosApiInstance = axios.create({
  baseURL: SPOT_URI,
});

axiosApiInstance.interceptors.request.use(async config => {
  return config;
});

export default axiosApiInstance;
