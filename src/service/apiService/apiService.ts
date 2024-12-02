import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";

export const apiService = axios.create({
    baseURL: "http://localhost:5189/api"
});

apiService.interceptors.request.use(
  (config) => {
    const tokenUserInfoAuthenticate = Cookies.get('tokenUserInfo')
        const userProfile = Cookies.get("userProfile");


    if (tokenUserInfoAuthenticate) {
      config.headers.Authorization = `Bearer ${tokenUserInfoAuthenticate}`
    }

    if (userProfile) {
      const userProfileDecoded = jwtDecode(userProfile) as string;

      config.headers['X-User-Profile'] = userProfileDecoded
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

