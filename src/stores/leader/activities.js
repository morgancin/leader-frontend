import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useActivitiesStore = defineStore("ActivitiesStore", {
    state: () => ({
        step : 1,
        message: null,
        activities: [],
        /*
        activity_information: {
            type: null,
            client: null,
            subject: null,
            activity_date: null,
        },
        */
        activity: {
            comments: '',
            activity_type_id: null,
            activity_subject_id: null,
            start_date: new Date(),
            start_time: { 
                hours: new Date().getHours(),
                minutes: new Date().getMinutes()
            }
        },
    }),
    actions: {
        date_format(date) {
            let d = date;    //new Date();
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);

            return `${ye}-${mo}-${da}`;
        },
        async createActivity(data_) {
            let data = { ...data_ };
            
            if(data.start_date & data.start_time)
                data.activity_date = this.date_format(data.start_date) + ' ' + (data.start_time.hours + ':' + data.start_time.minutes);

            axiosClient.post('/activities', data)
            .then(({data}) => {
                return data;
            })
            .catch((error) => {
                this.message = error.message;
            })
        },
        /*
        async fetchActivityTypes() {
            await axiosClient.get(`/activity-types`)
            .then (({data}) => {
                this.activity_types = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        */

        async fetchActivity(id) {
            axiosClient.get(`/activities/${id}`)
            .then (({data}) => {
                this.activity = data.data;
                //this.activity_information.client = data.data.prospect.full_name;
                //this.activity_information.subject = data.data.activity_subject.name;
                //this.activity_information.activity_date = data.data.activity_date;
                //this.activity_information.type = data.data.activity_subject.activity_type.name;
            })
            .catch((error) => {
                this.message = error.message;
            })
        },
        async fetchActivities(user_id = false, activity_date = false) {
            //this.activities = [];
            axiosClient.get(`/activities?user_id=${user_id}&activity_date=${activity_date}`)
            .then (({data}) => {
                this.activities = data.data;
            })
            .catch((error) => {
                this.message = error.message;
            })
        }
    }
});