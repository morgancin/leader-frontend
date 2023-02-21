import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataCategories()
{
    const error = ref(null);
    const results = ref([]);

    const fetchCategories = async (cType) => {
        results.value = [];
        
        await axiosClient.get(`/categories`)
        .then (({data}) => {
             //results.value = data;
             console.log(data.data);
            results.value = data.data;
        })
        .catch(function (err) {
            error.value = err;
        })
    };
    
    return{
        fetchCategories,
        results_categories: readonly(results),
        error,
    };
}