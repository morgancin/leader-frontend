import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useProspectingSourcesStore = defineStore("prospectingSourcesStore", {
    state: () => ({
        prospecting_source: {},
        prospecting_sources: []
        //message: null,
    }),
    actions: {
        async createProspectingSources(prospecting_source) {
            axiosClient.post('/prospecting-sources', prospecting_source)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/currencies' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        }
        /*
        async fetchProspectingSource(id) {
            axiosClient.get(`/prospecting-sources/${id}`)
            .then (({data}) => {
                //return data;
                this.prospecting_source = data;
            })
            .catch(function (error) {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchProspectingSources() {
            axiosClient.get('/prospecting-sources')
            .then (({data}) => {
                this.prospecting_sources = data;
            })
            .catch(function (error) {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchProspectingMeans(prospecting_source) {
            axiosClient.get('/prospecting-means?prospecting_source_id=${prospecting_source}')
            .then (({data}) => {
                this.prospecting_sources = data;
            })
            .catch(function (error) {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        }
        async updateClientOrigin() {
            axiosClient.put(`/prospecting-sources/${this.origin.id}`, this.origin)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        */
    }
});