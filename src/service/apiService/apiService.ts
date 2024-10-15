import axios from 'axios';
import Cookies from 'js-cookie';

export const apiService = axios.create({
    baseURL: "http://localhost:5189/api"
});

apiService.interceptors.request.use((config) => {
    const tokenUserInfoAuthenticate  = Cookies.get('tokenUserInfo');

  if (tokenUserInfoAuthenticate) {
    config.headers.Authorization = `Bearer ${tokenUserInfoAuthenticate}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
