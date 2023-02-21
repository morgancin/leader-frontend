import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataComponents()
{
    const error_components = ref(null);
    const results = ref([]);

    const fetchComponents = async (cType) => {
        results.value = [
            {id:1,name:"Componente Uno"},{id:2,name:"Componente Dos"},{id:3,name:"Componente Tres"}
        ];
        
        /*await axiosClient.get(`/components`)
        .then (({data}) => {
            results.value = data.data;
        })
        .catch(function (err) {
            error_components.value = err;
        })*/
    };
    
    return{
        fetchComponents,
        results_components: readonly(results),
        error_components,
    };
}