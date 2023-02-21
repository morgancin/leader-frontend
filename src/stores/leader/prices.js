import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const usePricesStore = defineStore("TagsStore", {
    state: () => ({
        price: {},
        prices: [],
        message: null,
    }),
    actions: {
        async createPrice(price) {
            axiosClient.post('/prices', price)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchPrice(id) {
            axiosClient.get(`/prices/${id}`)
            .then (({data}) => {
                //return data;
                this.price = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updatePrice() {
            axiosClient.put(`/prices/${this.price.id}`, this.price)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchPrices() {
            axiosClient.get('/prices')
            .then (({data}) => {
                //return data;
                this.price = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});