import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataPriceLists()
{
    const error = ref(null);
    const results = ref(null);

    const fetchPriceLists = async (cType) => {
        results.value = [];
        
        await axiosClient.get(`/prices/lists/list`)
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
        fetchPriceLists,
        price_lists: readonly(results),
        error,
    };
}