// Hooks/useAxiosSecure.js
import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://bloodline-server.vercel.app",
  withCredentials: true, 
});

const useAxiosSecure = () => {
  useEffect(() => {
    
    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("Axios Secure Error:", error);
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
