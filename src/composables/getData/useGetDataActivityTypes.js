import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataActivityTypes()
{
    const error = ref(null);
    const results = ref(null);

    const fetchActivityTypes = async (cType) => {
        results.value = [];
        
        await axiosClient.get(`/activity-types`)
        .then (({data}) => {
            results.value = data;
        })
        .catch(function (err) {
            error.value = err;
        })
    };
    
    return{
        fetchActivityTypes,
        results: readonly(results),
        error,
    };
}