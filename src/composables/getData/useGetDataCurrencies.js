import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataCurrencies()
{
    const error = ref(null);
    const results = ref([]);

    const fetchCurrencies = async (cType) => {
        results.value = [];
        
        await axiosClient.get(`/currencies`)
        .then (({data}) => {
            results.value = data.data;
        })
        .catch(function (err) {
            error.value = err;
        })
    };
    
    return{
        fetchCurrencies,
        currencies: readonly(results),
        error,
    };
}