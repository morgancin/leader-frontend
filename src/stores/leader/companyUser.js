import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useCompanyUserStore = defineStore("CompanyUserStore", {
    state: () => ({
        companyUser: {},
        companiesUsers: [],
        message: null,
    }),
    actions: {
        async createCompanyUser(companyUser) {
            axiosClient.post('/companies/users/register', companyUser)
            .then (({data}) => {
                
                this.companyUser = data.result;
                this.message = data.message;
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchCompanyUser() {
            axiosClient.get('/companies/users/list')
            .then (({data}) => {
                this.companyUser = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});