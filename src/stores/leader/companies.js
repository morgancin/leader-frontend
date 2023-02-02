import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useCompaniesStore = defineStore("CompaniesStore", {
    state: () => ({
        company: {},
        companies: [],
        message: null,
    }),
    actions: {
        async createCompany(company) {
            axiosClient.post('/companies/register', company)
            .then (({data}) => {
                this.company = data.result;
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchCompany(id) {
            axiosClient.get(`/companies/company`)
            .then (({data}) => {
                this.company = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateCompany(company) {
            axiosClient.patch(`/companies/update`, company)
            .then (({data}) => {
                this.company = data.result;
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});