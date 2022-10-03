import axios from 'axios';
import { AxiosInterceptor } from 'fetch-queue/hoc';

const API_URL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = API_URL;

axios.interceptors.response.use(AxiosInterceptor.ResponseInterceptorFullfiled);
