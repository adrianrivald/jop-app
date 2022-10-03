import axios from 'axios';
import { AxiosInterceptor } from 'fetch-queue/hoc';
import Cookies from 'universal-cookie';

const API_URL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use((config) => {
  const cookies = new Cookies();

  const token = cookies.get('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(AxiosInterceptor.ResponseInterceptorFullfiled);
