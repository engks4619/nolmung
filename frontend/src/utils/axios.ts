import axios from 'axios';
import {API_URL, COMMUNITY_PORT} from '@env';

const HOST = API_URL;
const PORT = COMMUNITY_PORT;
const BASE_URL = `${HOST}:${PORT}`;

const axiosApiInstance = axios.create({
  baseURL: BASE_URL,
});

axiosApiInstance.interceptors.request.use(async config => {
  return config;
});

export default axiosApiInstance;
