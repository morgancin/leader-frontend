import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataPermissions()
{
    const permissions_errors = ref(null);
    const results = ref([]);

    const fetchPermissions = async (cType) => {
        results.value = [];
        
        await axiosClient.get(`/users/permissions`)
        .then (({data}) => {
            results.value = data.data;
        })
        .catch(function (err) {
            permissions_errors.value = err;
        })
    };    

    return{
        fetchPermissions,
        results_permissions: readonly(results),
        permissions_errors
    };
}