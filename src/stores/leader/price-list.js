import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const usePriceListStore = defineStore("PriceListStore", {
    state: () => ({
        price_list: {},
        price_lists: [],
        message: null,
    }),
    actions: {
        async createPriceList(price_list) {
            axiosClient.post('/price-lists', price_list)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchPriceList(id) {
            axiosClient.get(`/price-lists/${id}`)
            .then (({data}) => {
                this.price_list = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchPriceLists(id) {
            axiosClient.get(`/price-lists`)
            .then (({data}) => {
                this.price_list = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updatePriceList() {
            axiosClient.put(`/price-lists/${this.price_list.id}`, this.price_list)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});