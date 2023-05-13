import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useAccountsStore = defineStore("AccountsStore", {
    state: () => ({
        account: {},
        accounts: []
    }),
    actions: {
        async createAccount(account) {
            axiosClient.post('/accounts', account)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/accounts' });

            }).catch ((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchAccounts() {
            axiosClient.get('/accounts')
            .then (({data}) => {
                this.accounts = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        }
    }
});