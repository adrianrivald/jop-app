import axios from 'axios';
import { AxiosInterceptor } from 'fetch-queue/hoc';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;
const token = new Cookies().get('token');

const instance = axios.create({
  baseURL: API_URL,
});

instance.defaults.baseURL = API_URL;
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.interceptors.response.use(AxiosInterceptor.ResponseInterceptorFullfiled);

instance.interceptors.request.use(
  (request) => {
    console.log(request, 'request');

    return request;
  },
  (error) => {
    console.log(error, 'request error');
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(response, 'response');

    return response;
  },
  (error) => {
    console.log(error, 'response error');

    toast.error(error?.response?.data?.message !== '' ? error?.response?.data?.message : 'Something went wrong', {
      position: toast.POSITION.TOP_CENTER,
    });
    return Promise.reject(error);
  }
);

export default instance;
