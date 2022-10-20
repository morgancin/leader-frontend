import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useActivitiesStore = defineStore("ActivitiesStore", {
    state: () => ({
        step : 1,
        message: null,
        activities: [],
        activity: {
            comments: '',
            user_id: null,
            //client_id: null,
            activity_type_id: null,
            activity_subject_id: null,

            end_date: new Date().toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' }),
            start_date: new Date().toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' }),
            activity_date: new Date().toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' }),
            end_time: { 
                hours: new Date().getHours(),
                minutes: new Date().getMinutes()
            },
            start_time: { 
                hours: new Date().getHours(),
                minutes: new Date().getMinutes()
            },
        },
    }),
    actions: {
        async fetchActivitiesTypes() {
            let result = [];
            
            await axiosClient.get(`/activities/types/list`)
            .then (({data}) => {
                this.message = data;
                //this.selects.dataActivitiesTypes = data;
                result = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })

            return result;
        },
        async fetchActivitiesSubjects() {
            let result = [];
            
            if(this.activity.activity_type_id){
                await axiosClient.get(`/activities/subjects/list/${this.activity.activity_type_id}`)
                .then (({data}) => {
                    this.message = data.message;
                    //this.selects.dataActivitiesSubjects = data;
                    result = data;
                })
                .catch(function (error) {
                    this.message = error.message;
                })

            }else{
                this.activity.activity_subject_id = null;
            }

            return result;
        },
    }
});