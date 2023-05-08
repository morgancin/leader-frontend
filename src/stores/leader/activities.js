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
            //client_id: null,
            //activity_result_id: null,
            comments: '',
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
        async createActivityReschedule(data, activities_results_tracking_type) {
            if(activities_results_tracking_type == 'activity') {
                //data.end_time = data.end_time.hours + ':' + data.end_time.minutes;
                //data.end_date = new Date(data.end_date).toLocaleDateString("es-MX", { year: 'numeric', month: 'numeric', day: 'numeric' });
                //data.activity_date = new Date(data.activity_date).toLocaleDateString("es-MX", { year: 'numeric', month: 'numeric', day: 'numeric' });
                data.start_time = data.start_time.hours + ':' + data.start_time.minutes;
                data.start_date = new Date(data.start_date).toLocaleDateString("es-MX", { year: 'numeric', month: 'numeric', day: 'numeric' });
            }

            axiosClient.post(`/activities/reschedule/${this.activity.id}`, data)
            .then (({data}) => {
                return data;
            })
            .catch((error) => {
                this.message = error.message;
            })
        },*/

        async fetchActivitiesTypes() {
            let result = [];
            
            await axiosClient.get(`/activity-types`)
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
            axiosClient.get(`/activities/${id}`)
            .then (({data}) => {
                this.activity = data.data;
                this.activity_information.client = data.data.prospect.full_name;
                this.activity_information.subject = data.data.activity_subject.name;
                this.activity_information.activity_date = data.data.activity_date;
                this.activity_information.type = data.data.activity_subject.activity_type.name;
            })
            .catch((error) => {
                this.message = error.message;
            })
        },
        
        async fetchActivities(user_id = false, activity_date = false) {
            this.activities = [];

            axiosClient.get(`/activities?user_id=${user_id}&activity_date=${activity_date}`)
            .then (({data}) => {
                this.activities = data.data;
            })
            .catch((error) => {
                this.message = error.message;
            })
        },

        async fetchActivitiesSubjects(activity_type_id) {
            let result = [];

            await axiosClient.get(`/activity-subjects/${activity_type_id}`)
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