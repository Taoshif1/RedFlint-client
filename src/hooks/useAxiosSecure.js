import axios from "axios";

const apiBaseURL = import.meta.env.PROD
  ? "/api"
  : `${import.meta.env.VITE_API_URL}/api`;

export const axiosSecure = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
});

const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
