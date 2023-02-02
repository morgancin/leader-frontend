import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useActivitySubjectStore = defineStore("ActivitySubjectStore", {
    state: () => ({
        subject: {},
        subjects: [],
        message: null,
    }),
    actions: {
        async createActivitySubject(subject) {
            axiosClient.post('/activities/subjects/register', subject)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        /*
        async fetchActivitySubject() {
            axiosClient.get('/activities/subjects/list')
            .then (({data}) => {
                //return data;
                this.subject = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        */
        async fetchActivitiesSubjects() {
            axiosClient.get('/activities/subjects/list')
            .then (({data}) => {
                //return data;
                this.subject = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchActivitySubject(id) {
            axiosClient.get(`/activities/subjects/activity-subject/${id}`)
            .then (({data}) => {
                //return data;
                this.subject = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateActivitySubject() {
            axiosClient.patch(`/activities/subjects/update/${this.subject.id}`, this.subject)
            .then (({data}) => {
                //this.activity_type = data.result;
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }

})