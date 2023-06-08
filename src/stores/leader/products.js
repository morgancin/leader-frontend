import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useProductsStore = defineStore("ProductsStore", {
    state: () => ({
        product: {},
        products: []
    }),
    actions: {
        async createProduct(product) {
            axiosClient.post('/products', product)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/products' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updateProduct() {
            axiosClient.put(`/products/${this.product.id}`, this.product)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/products' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchProducts() {
            axiosClient.get('/products')
            .then (({data}) => {
                this.products = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchProduct(id) {
            axiosClient.get(`/products/${id}`)
            .then (({data}) => {
                this.product = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
    }
});