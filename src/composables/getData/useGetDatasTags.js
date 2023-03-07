import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDatasTags()
{
    const error = ref(null);
    const results = ref(null);

    const fetchTags = async (cType) => {
        results.value = [];

        //if(cType === 'list') {

        //}
            
        
        await axiosClient.get(`/tags/${cType}`)
        .then (({data}) => {
            results.value = data;
            //results.value = data.data;
        })
        .catch(({error}) => {
            error.value = error;
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