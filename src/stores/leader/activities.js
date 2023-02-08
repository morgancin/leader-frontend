import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useActivitiesStore = defineStore("ActivitiesStore", {
    state: () => ({
        step : 1,
        message: null,
        activities: [],
        activity_information: {
            type: null,
            client: null,
            subject: null,
            activity_date: null,
        },
        activity: {
            //activity_type_id: null,
            comments: '',
            client_id: null,
            activity_subject_id: null,
            start_time: { 
                hours: new Date().getHours(),
                minutes: new Date().getMinutes()
            },
            start_date: new Date().toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' }),
            /*
            end_time: { 
                hours: new Date().getHours(),
                minutes: new Date().getMinutes()
            },
            end_date: new Date().toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' }),
            activity_date: new Date().toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' }),
            */
        },
    }),
    actions: {
        async createActivity() {
            //this.activity.end_time = this.activity.end_time.hours + ':' + this.activity.end_time.minutes;
            //this.activity.end_date = new Date(this.activity.end_date).toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' });
            //this.activity.activity_date = new Date(this.activity.activity_date).toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' });
            this.activity.start_time = this.activity.start_time.hours + ':' + this.activity.start_time.minutes;
            this.activity.start_date = new Date(this.activity.start_date).toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' });

            axiosClient.post('/activities/create', this.activity)
            .then (({data}) => {
                return data;
            })

            .catch((error) => {
                this.message = error.message;
            })
        },

        async createActivityReschedule(data, activities_results_tracking_type) {
            if(activities_results_tracking_type == 'activity') {
                //data.end_time = data.end_time.hours + ':' + data.end_time.minutes;
                //data.end_date = new Date(data.end_date).toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' });
                //data.activity_date = new Date(data.activity_date).toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' });
                data.start_time = data.start_time.hours + ':' + data.start_time.minutes;
                data.start_date = new Date(data.start_date).toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' });
            }

            axiosClient.post(`/activities/reschedule/create/${this.activity.id}`, data)
            .then (({data}) => {
                return data;
            })
            .catch((error) => {
                this.message = error.message;
            })
        },

        async fetchActivitiesTypes() {
            let result = [];
            
            await axiosClient.get(`/activities/types/list`)
            .then (({data}) => {
                this.message = data;
                //this.selects.dataActivitiesTypes = data;
                result = data;
            })
            .catch((error) => {
                this.message = error.message;
            })

            return result;
        },

        async fetchActivity(id) {
            axiosClient.get(`/activities/activity/${id}`)
            .then (({data}) => {
                this.activity = data.data;
                this.activity_information.client = data.data.client.full_name;
                this.activity_information.subject = data.data.activity_subject.name;
                this.activity_information.activity_date = data.data.activity_date_format;
                this.activity_information.type = data.data.activity_subject.activity_type.name;
            })
            .catch((error) => {
                this.message = error.message;
            })
        },

        async fetchActivitiesSubjects(activity_type_id) {
            let result = [];

            await axiosClient.get(`/activities/subjects/list/${activity_type_id}`)
            .then (({data}) => {
                this.message = data.message;
                //this.selects.dataActivitiesSubjects = data;
                result = data;
            })
            .catch((error) => {
                this.message = error.message;
            })

            return result;
        },
    }
});