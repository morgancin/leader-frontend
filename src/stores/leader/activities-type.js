import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useActivitiesTypeStore = defineStore("ActivitiesTypeStore", {
    state: () => ({
        activity_type: {},
        activities_types: []
    }),
    actions: {
        async createActivityType(activity) {
            axiosClient.post('/activity-types', activity)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/activities-types' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updateActivityType() {
            axiosClient.put(`/activity-types/${this.activity_type.id}`, this.activity_type)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/activities-types' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchActivitiesTypes() {
            axiosClient.get('/activity-types')
            .then (({data}) => {
                //return data;
                this.activities_types = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchActivityType(id) {
            axiosClient.get(`/activity-types/${id}`)
            .then (({data}) => {
                //return data;
                this.activity_type = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
    }
});