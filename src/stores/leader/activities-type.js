import { defineStore } from "pinia";
import axiosClient from "../../axios";

// export const useActivitiesTypeStore = defineStore("ActivitiesType", {
export const useActivitiesTypeStore = defineStore("ActivitiesTypeStore", {
    state: () => ({
        activity_type: {},
        activities_types: [],
        message: null,
    }),
    actions: {
        async createActivityType(activity) {
            axiosClient.post('/activity-types', activity)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateActivityType() {
            axiosClient.put(`/activity-types/${this.activity_type.id}`, this.activity_type)
            .then (({data}) => {
                //this.activity_type = data.result;
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })

            /*
            ///EJEMPLO DE ERROR, sacado del curso de DevTaller
            .catch(error){
                hasError.value=true;
                if(axios.isAxiosError(error)){
                    return errorMessage.value = error.message;
                }
            }
            */
        },
        /*
        async fetchActivity() {
            axiosClient.get('/activities/types/list')
            .then (({data}) => {
                //return data;
                this.activity = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        */
        async fetchActivitiesTypes() {
            axiosClient.get('/activity-types')
            .then (({data}) => {
                //return data;
                this.activities_types = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchActivityType(id) {
            axiosClient.get(`/activity-types/${id}`)
            .then (({data}) => {
                //return data;
                this.activity_type = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});