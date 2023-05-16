import axios from "axios";
import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useUsersStore = defineStore("UsersStore", {
    state: () => ({
        user: {},
        users: []
        //message: null,
    }),
    actions: {
        async createUser(user) {
            axiosClient.post('/users', user)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/dashboard-user' });
            })
            .catch((error) => {
                //this.message = error.message;
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },

        async fetchUser(id) {
            axiosClient.get(`/users`)
            .then (({data}) => {
                this.user = data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
            /*
            this.error = null;
            this.loading = true;
            try {
                this.course = await fetch(`${API_URL}/${id}`).then(res => res.json());
            } catch (e) {
                this.error = e;
            } finally {
                this.loading = false;
            }
            */
        },

        async updateUser(user) {
            axiosClient.put(`/users`, user)
            .then (({data}) => {
                this.user = data.result;
                this.message = data.message;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        
        async deleteUser(id) {
            //this.message = 'heyyy';
            /*
            axiosClient.delete(`/users/${id}`)
            .then (({data}) => {
                this.user = data.result;
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
            */

            
            /*
            this.error = null;
            this.loading = true;
            try {
                await fetch(`${API_URL}/${id}`, {
                    method: "DELETE",
                });
                await this.fetchCourses();
            } catch (e) {
                this.error = e;
            } finally {
                this.loading = false;
            }
            */
        }
    }
});
