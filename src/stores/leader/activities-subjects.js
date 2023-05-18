import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useActivitySubjectStore = defineStore("ActivitySubjectStore", {
    state: () => ({
        subject: {},
        subjects: []
    }),
    actions: {
        async createActivitySubject(subject) {
            axiosClient.post('/activity-subjects', subject)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/subjects' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchActivitiesSubjects() {
            axiosClient.get('/activity-subjects')
            .then (({data}) => {
                //return data;
                this.subject = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchActivitySubject(id) {
            axiosClient.get(`/activity-subjects/${id}`)
            .then (({data}) => {
                this.subject = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updateActivitySubject() {
            axiosClient.put(`/activity-subjects/${this.subject.id}`, this.subject)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/subjects' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
    }

})