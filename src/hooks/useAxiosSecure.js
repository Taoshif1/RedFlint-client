import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
