import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.NODE_ENV === 'production' ? '' : `${import.meta.env.VITE_BASE_DEV_API_URL}`,
    withCredentials: true
})