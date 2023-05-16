import { defineStore } from "pinia";
import axiosClient from "../../axios";
//ESTE ARCHIVO SE BORRARÁ

export const useClientOriginMediumStore = defineStore("ClientOriginMediumStore", {
    state: () => ({
        medium: {},
        mediums: [],
        message: null,
    }),
    actions: {
        async createClientOriginMedium(medium) {
            axiosClient.post('/prospecting-means', medium)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateClientOriginMedium() {
            axiosClient.put(`/prospecting-means/${this.medium.id}`, this.medium)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchClientOriginMedium(id) {
            axiosClient.get(`/prospecting-means/${id}`)
            .then (({data}) => {
                //return data;
                this.medium = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchClientsOriginsMedium() {
            axiosClient.get('/prospecting-means')
            .then (({data}) => {
                //return data;
                this.medium = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});