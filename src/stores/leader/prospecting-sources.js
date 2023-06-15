import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useProspectingSourcesStore = defineStore("prospectingSourcesStore", {
    state: () => ({
        prospecting_source: {},
        prospecting_sources: []
    }),
    actions: {
        async createProspectingSources(prospecting_source) {
            axiosClient.post('/prospecting-sources', prospecting_source)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/prospecting-sources' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updateProspectingSources() {
            axiosClient.put(`/prospecting-sources/${this.prospecting_source.id}`, this.prospecting_source)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/prospecting-sources' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchProspectingSource(id) {
            axiosClient.get(`/prospecting-sources/${id}`)
            .then (({data}) => {
                this.prospecting_source = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
    }
});