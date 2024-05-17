import axios from 'axios'

export const apiService = axios.create({
    baseURL:"http://localhost:5293/api/v1"
})

