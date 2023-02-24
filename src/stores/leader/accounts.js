import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useAccountsStore = defineStore("AccountsStore", {
    state: () => ({
        account: {},
        accounts: [],
        message: null,
    }),
    actions: {
        /*
        async createCategory(category) {
            axiosClient.post('/categories', category)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateCategory() {
            axiosClient.put(`/categories/${this.category.id}`, this.category)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })

            
            ///EJEMPLO DE ERROR, sacado del curso de DevTaller
            //.catch(error){
                //hasError.value=true;
                //if(axios.isAxiosError(error)){
                    //return errorMessage.value = error.message;
                //}
            //}
        },
        */
        async fetchAccounts() {
            axiosClient.get('/accounts')
            .then (({data}) => {
                this.accounts = data.data;
            })
            .catch(({error}) => {
                this.message = "Error";
            })
        },
        /*
        async fetchCategory(id) {
            axiosClient.get(`/categories/${id}`)
            .then (({data}) => {
                this.category = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        */
    }
});