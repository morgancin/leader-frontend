import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDatasTags()
{
    const error = ref(null);
    const results = ref(null);

    const fetchTags = async (cType) => {
        results.value = [];
        
        await axiosClient.get(`/tags/list/${cType}`)
        .then (({data}) => {
            //results.value = data.data;
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
        fetchTags,
        results: readonly(results),
        error,
    };
}