import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useQuotesStore = defineStore("QuotesStore", {
    state: () => ({
        quote: {
            'description': ''
        },
        quotes: [],
        message: null,
    }),
    actions: {
        async createQuote(category) {
            axiosClient.post('/quotes/create', quote)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateQuote() {
            axiosClient.patch(`/quotes/update/${this.quote.id}`, this.quote)
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
        async fetchQuotes() {
            axiosClient.get('/quotes/list')
            .then (({data}) => {
                this.quotes = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchQuote(id) {
            axiosClient.get(`/quotes/quote/${id}`)
            .then (({data}) => {
                this.quote = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});