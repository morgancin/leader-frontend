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
        async fetchActivitySubject() {
            //EL 1 SE SUSTITUYE POR id_activity_type
            axiosClient.get('/activities/subjects/list')
            .then (({data}) => {
                //return data;
                this.subject = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        }
    }

})