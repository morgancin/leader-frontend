import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useClientOriginStore = defineStore("ClientOriginStore", {
    state: () => ({
        origin: {},
        origins: [],
        message: null,
    }),
    actions: {
        async createClientOrigin(origin) {
            axiosClient.post('/clients/origins/register ', origin)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchClientOrigin(id) {
            axiosClient.get(`/clients/origins/client-origin/${id}`)
            .then (({data}) => {
                //return data;
                this.origin = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchClientsOrigins() {
            axiosClient.get('/clients/origins/list')
            .then (({data}) => {
                //return data;
                this.origin = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateClientOrigin() {
            axiosClient.patch(`/clients/origins/update/${this.origin.id}`, this.origin)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});