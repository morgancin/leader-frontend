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
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchUsers() {
            axiosClient.get('/users')
            .then (({data}) => {
                this.users = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchUser(id) {
            axiosClient.get(`/users/${id}`)
            .then (({data}) => {
                this.user = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updateUser() {
            axiosClient.put(`/users/${this.user.id}`, this.user)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/dashboard-user' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        }
    }
});
