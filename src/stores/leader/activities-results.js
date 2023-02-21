import { defineStore } from "pinia";
import axiosClient from "../../axios";

// export const useActivitiesTypeStore = defineStore("ActivitiesType", {
export const useActivitiesResultStore = defineStore("ActivitiesResultStore", {
    state: () => ({
        activity_result: {},
        activities_results: [],
        message: null,
    }),
    actions: {
        async createActivityResult(activity) {
            axiosClient.post('/activity-results', activity)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateActivityResult() {
            axiosClient.put(`/activity-results/${this.activity_result.id}`, this.activity_result)
            .then (({data}) => {
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
        async fetchActivitiesResults() {
            axiosClient.get('/activity-results')
            .then (({data}) => {
                //return data;
                this.activities_results = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchActivityResult(id) {
            axiosClient.get(`/activity-results/${id}`)
            .then (({data}) => {
                //return data;
                this.activity_result = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});