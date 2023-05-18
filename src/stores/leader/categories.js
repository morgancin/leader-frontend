import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useCategoriesStore = defineStore("CategoriesStore", {
    state: () => ({
        category: {},
        categories: []
    }),
    actions: {
        async createCategory(category) {
            axiosClient.post('/categories', category)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/categories' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updateCategory() {
            axiosClient.put(`/categories/${this.category.id}`, this.category)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/categories' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchCategories() {
            axiosClient.get('/categories')
            .then (({data}) => {
                this.categories = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchCategory(id) {
            axiosClient.get(`/categories/${id}`)
            .then (({data}) => {
                this.category = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
    }
});