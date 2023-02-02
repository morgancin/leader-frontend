import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataActivityResults()
{
    const error = ref(null);
    const results = ref(null);

    const fetchActivitiesResults = async (cType) => {
        results.value = [];

        await axiosClient.get('/activities/results/list')
        .then (({data}) => {
            results.value = data;
        })
        .catch(function (err) {
            error.value = err;
        })
    };

    /*
    const makeRequest = async (API_URL) => {
        try{
            const request = await (await fetch(API_URL)).json();
            results.value = request;

        } catch (err){
            console.log(err);
            error.value = err;
        }
    };
    */
    return{
        fetchActivitiesResults,
        results: readonly(results),
        error,
    };
}