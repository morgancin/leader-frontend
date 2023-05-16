import { defineStore } from "pinia";
import axiosClient from "../../axios";
//ESTE ARCHIVO SE BORRARÁ

export const useClientOriginStore = defineStore("ClientOriginStore", {
    state: () => ({
        origin: {},
        origins: [],
        message: null,
    }),
    actions: {
        async createClientOrigin(origin) {
            axiosClient.post('/prospecting-sources', origin)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchClientOrigin(id) {
            axiosClient.get(`/prospecting-sources/${id}`)
            .then (({data}) => {
                //return data;
                this.origin = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchClientsOrigins() {
            axiosClient.get('/prospecting-sources')
            .then (({data}) => {
                //return data;
                this.origin = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateClientOrigin() {
            axiosClient.put(`/prospecting-sources/${this.origin.id}`, this.origin)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});