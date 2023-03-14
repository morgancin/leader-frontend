import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useContractsStore = defineStore("ContractsStore", {
    state: () => ({
        step:1,
        contract: {
            prospect_id: null
        },
        contracts: [],
        message: null,
    }),
    actions: {
        async createContract(contract) {
            axiosClient.post('/contracts', contract)
            .then (({data}) => {
                return data;
            })
            .catch((error) => {
                this.message = error.message;
            })
        },
        async updateContract() {
            axiosClient.put(`/contracts/${this.contract.id}`, this.contract)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch((error) => {
                this.message = error.message;
            })
        },
        async fetchContracts() {
            axiosClient.get('/contracts')
            .then (({data}) => {
                this.contracts = data;
            })
            .catch((error) => {
                this.message = error.message;
            })
        },
        async fetchContract(id) {
            axiosClient.get(`/contracts/${id}`)
            .then (({data}) => {
                this.contract = data;
            })
            .catch((error) => {
                this.message = error.message;
            })
        },
    }
});