import { defineStore } from "pinia";
import axiosClient from "../../axios";

// export const useActivitiesTypeStore = defineStore("ActivitiesType", {
export const useActivitiesTypeStore = defineStore("ActivitiesTypeStore", {
    state: () => ({
        activity: {},
        activities: [],
        message: null,
    }),
    actions: {
        async createActivityType(activity) {
            axiosClient.post('/activities/types/register', activity)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchActivity() {
            axiosClient.get('/activities/types/list')
            .then (({data}) => {
                //return data;
                this.activity = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
            /*
            this.error = null;
            this.loading = true;
            try {
                this.course = await fetch(`${API_URL}/${id}`).then(res => res.json());
            } catch (e) {
                this.error = e;
            } finally {
                this.loading = false;
            }
            */
        },
    }
});