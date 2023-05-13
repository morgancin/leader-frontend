import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useActivitiesResultStore = defineStore("ActivitiesResultStore", {
    state: () => ({
        activity_result: {},
        activities_results: []
    }),
    actions: {
        async createActivityResult(activity) {
            axiosClient.post('/activity-results', activity)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/activity-results' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updateActivityResult() {
            axiosClient.put(`/activity-results/${this.activity_result.id}`, this.activity_result)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/activity-results' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchActivitiesResults() {
            axiosClient.get('/activity-results')
            .then (({data}) => {
                this.activities_results = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchActivityResult(id) {
            axiosClient.get(`/activity-results/${id}`)
            .then (({data}) => {
                this.activity_result = data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
    }
});