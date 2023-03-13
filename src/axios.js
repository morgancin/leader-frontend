import axios from "axios";

//import { storeToRefs } from "pinia";
//const { user } = storeToRefs(useAuthStore());
//import { useAuthStore } from "@/stores/leader/auth";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE}`
});

axiosClient.interceptors.request.use(config =>
{
  config.headers['Accept'] = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers.Authorization = `Bearer ${sessionStorage.getItem("TOKEN")}`;

  return config;
})

export default axiosClient;