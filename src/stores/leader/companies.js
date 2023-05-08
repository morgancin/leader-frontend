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
            axiosClient.post('/companies', company)
            .then (({data}) => {
                this.company = data.data;
                //this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchCompanies() {
            axiosClient.get(`/companies`)
            .then (({data}) => {
                this.companies = data.data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchCompany(id) {
            axiosClient.get(`/companies/${id}`)
            .then (({data}) => {
                this.company = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateCompany(company) {
            axiosClient.put(`/companies`, company)
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