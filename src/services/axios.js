import axios from 'axios';

const API_URL = process.env.REACT_API_URL
const token = localStorage.getItem('jwt') ?? '5|T45hz7TdtCoEHVbaxBhtx4tN6exZunEqHGWEILrc';

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : `Bearer ${token}`
  },
});

axiosInstance.interceptors.request.use(
  config => {

    if (!token) { // negated condition , will be used when there is stored token
      config.headers.Authorization = `Bearer ${token}`; // variable token will be used here
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
    return config;
  },

  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data: response} = error.response ?? {};
    const message = response.message ?? error.message;
      return Promise.reject(new Error(message))
  }
)

export default axiosInstance;