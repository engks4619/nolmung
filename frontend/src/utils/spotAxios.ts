import axios from 'axios';

const HOST = 'http://k7a703.p.ssafy.io';
const SPOT_PORT = '8083';

const SPOT_URI = `${HOST}:${SPOT_PORT}/api`;

const axiosApiInstance = axios.create({
  baseURL: SPOT_URI,
});

axiosApiInstance.interceptors.request.use(async config => {
  return config;
});

export default axiosApiInstance;
