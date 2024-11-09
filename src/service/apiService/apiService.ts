import axios from 'axios'
import Cookies from 'js-cookie'

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
      config.headers['X-User-Profile'] = userProfile
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

