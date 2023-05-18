import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const usePriceListStore = defineStore("PriceListStore", {
    state: () => ({
        price_list: {},
        price_lists: []
        //message: null,
    }),
    actions: {
        async createPriceList(price_list) {
            axiosClient.post('/price-lists', price_list)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/price-lists' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchPriceList(id) {
            axiosClient.get(`/price-lists/${id}`)
            .then (({data}) => {
                this.price_list = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchPriceLists(id) {
            axiosClient.get(`/price-lists`)
            .then (({data}) => {
                this.price_list = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updatePriceList() {
            axiosClient.put(`/price-lists/${this.price_list.id}`, this.price_list)
            .then (({data}) => {
                //this.message = data.message;
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/price-lists' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
    }
});