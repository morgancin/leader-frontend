import axios from "axios";

//import { storeToRefs } from "pinia";
//import { useAuthStore } from "@/stores/leader/auth";
//const { user } = storeToRefs(useAuthStore());

const axiosClient = axios.create({
  baseURL: 'https://api.leader.arkanmedia.com/api'
});

axiosClient.interceptors.request.use(config =>
{
  config.headers['Content-Type'] = 'application/json';
  config.headers.Accept = 'application/json;charset=UTF-8';
  config.headers.Authorization = `Bearer ${sessionStorage.getItem("TOKEN")}`;

  return config;
})

export default axiosClient;