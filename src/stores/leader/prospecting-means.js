import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useProspectingMeansStore = defineStore("ProspectingMeansStore", {
    state: () => ({
        prospecting_mean: {},
        prospecting_means: []
    }),
    actions: {
        async createProspectingMeans(prospecting_mean) {
            axiosClient.post('/prospecting-means', prospecting_mean)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/prospecting-means' });
            })
            .catch(function (error) {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updateProspectingMeans() {
            axiosClient.put(`/prospecting-means/${this.prospecting_mean.id}`, this.prospecting_mean)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/prospecting-means' });
            })
            .catch(function (error) {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchProspectingMean(id) {
            axiosClient.get(`/prospecting-means/${id}`)
            .then (({data}) => {
                //return data;
                this.prospecting_mean = data.data;
            })
            .catch(function (error) {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchProspectingMeans() {
            axiosClient.get('/prospecting-means')
            .then (({data}) => {
                //return data;
                this.prospecting_means = data.data;
            })
            .catch(function (error) {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
    }
});