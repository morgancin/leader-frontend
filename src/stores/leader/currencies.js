import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useCurrenciesStore = defineStore("CurrenciesStore", {
    state: () => ({
        currency: {},
        currencies: [],
        message: null,
    }),
    actions: {
        async createCurrency(currency) {
            axiosClient.post('/currencies/create', currency)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateCurrency() {
            axiosClient.patch(`/currencies/update/${this.currency.id}`, this.currency)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })

            /*
            ///EJEMPLO DE ERROR, sacado del curso de DevTaller
            .catch(error){
                hasError.value=true;
                if(axios.isAxiosError(error)){
                    return errorMessage.value = error.message;
                }
            }
            */
        },
        async fetchCurrencies() {
            axiosClient.get('/currencies/list')
            .then (({data}) => {
                this.currencies = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchCurrency(id) {
            axiosClient.get(`/currencies/currency/${id}`)
            .then (({data}) => {
                this.currency = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});