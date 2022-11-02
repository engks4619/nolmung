import axios from 'axios';

const HOST = 'http://k7a703.p.ssafy.io';
const COMMUNITY_PORT = '8081';

const COMMUNITY_URI = `${HOST}:${COMMUNITY_PORT}`;

const axiosApiInstance = axios.create({
  baseURL: COMMUNITY_URI,
});

axiosApiInstance.interceptors.request.use(async config => {
  return config;
});

export default axiosApiInstance;
