import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataCurrencies()
{
    const error_currencies = ref(null);
    const results = ref(null);

    const fetchCurrencies = async (cType) => {
        results.value = [];
        
        results.value = [
            {id:1,code:"MXN",name:"Peso mexicano"},{id:2,code:"JPY",name:"Yen japones"},{id:3,code:"USD",name:"Dolar americano"}
        ];

        /*
        await axiosClient.get(`/currencies`)
        .then (({data}) => {
            results.value = data.data;
        })
        .catch(function (err) {
            error_currencies.value = err;
        })*/
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
        fetchCurrencies,
        currencies: readonly(results),
        error_currencies,
    };
}