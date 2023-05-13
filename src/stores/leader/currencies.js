import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useCurrenciesStore = defineStore("CurrenciesStore", {
    state: () => ({
        currency: {},
        currencies: []
        //message: null,
        //error: null
    }),
    actions: {
        async createCurrency(currency) {
            axiosClient.post('/currencies', currency)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/currencies' });

            }).catch ((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updateCurrency() {
            axiosClient.put(`/currencies/${this.currency.id}`, this.currency)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/currencies' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
                //this.message = error.message;
            })
        },
        async fetchCurrencies() {
            axiosClient.get('/currencies')
            .then (({data}) => {
                this.currencies = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
                //this.message = error.message;
            })
        },
        async fetchCurrency(id) {
            axiosClient.get(`/currencies/${id}`)
            .then (({data}) => {
                this.currency = data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
                //this.message = error.message;
            })
        },
    }
});