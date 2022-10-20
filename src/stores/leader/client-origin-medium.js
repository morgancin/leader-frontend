import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useClientOriginMediumStore = defineStore("ClientOriginMediumStore", {
    state: () => ({
        medium: {},
        mediums: [],
        message: null,
    }),
    actions: {
        async createClientOriginMedium(medium) {
            axiosClient.post('/clients/origins/mediums/register ', medium)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchClientOriginMedium() {
            axiosClient.get('/clients/origins/mediums/list')
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