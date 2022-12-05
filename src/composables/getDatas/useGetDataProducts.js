import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataProducts()
{
    const error = ref(null);
    const results = ref(null);

    const fetchProducts = async (cType) => {
        results.value = [];
        
        await axiosClient.get(`/products/list`)
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
        fetchProducts,
        products: readonly(results),
        error,
    };
}