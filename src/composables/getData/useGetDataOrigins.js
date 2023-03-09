import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataOrigins()
{
    const error = ref(null);
    const results = ref(null);

    const fetchClientOrigin = async (cType) => {
        results.value = [];

        await axiosClient.get('/prospecting-sources')
        .then (({data}) => {
            results.value = data.data;
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
        fetchClientOrigin,
        results: readonly(results),
        error,
    };
}