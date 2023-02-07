import axios from "axios";

//import { storeToRefs } from "pinia";
//import { useAuthStore } from "@/stores/leader/auth";
//const { user } = storeToRefs(useAuthStore());
//https://www.cursosdesarrolloweb.es/blog/laravel-sanctum
//this.global_property_baseURL = 'https://api.leader.arkanmedia.com/api';
//app.config.globalProperties.global_property_baseURL = 'https://api.leader.arkanmedia.com/api';

//this.global_property_baseURL;

const axiosClient = axios.create({
  baseURL: 'https://api.leader.arkanmedia.com/api'
});

axiosClient.interceptors.request.use(config =>
{
  //axios.defaults.withCredentials = true;
  //config.headers.Accept = 'application/json;charset=UTF-8';
  config.headers['Accept'] = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers.Authorization = `Bearer ${sessionStorage.getItem("TOKEN")}`;

  return config;
})

export default axiosClient;