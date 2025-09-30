import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  timeout: 10000,
});

export default axiosInstance;
