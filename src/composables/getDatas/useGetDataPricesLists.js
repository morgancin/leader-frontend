import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataPricesLists()
{
    const error_prices_lists = ref(null);
    const results = ref([]);

    const fetchPricesLists = async (cType) => {
        results.value = [];
        
        await axiosClient.get(`/prices/lists/list`)
        .then (({data}) => {
             //results.value = data;
            results.value = data.data;
        })
        .catch(function (err) {
            error_prices_lists.value = err;
        })
    };
    
    return{
        fetchPricesLists,
        results_prices_lists: readonly(results),
        error_prices_lists,
    };
}