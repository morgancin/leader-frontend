import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataRoles()
{
    const roles_errors = ref(null);
    const results = ref([]);

    const fetchRoles = async (cType) => {
        results.value = [];
        
        await axiosClient.get(`/users/roles`)
        .then (({data}) => {
            results.value = data.data;
        })
        .catch(function (err) {
            roles_errors.value = err;
        })
    };    

    return{
        fetchRoles,
        results_roles: readonly(results),
        roles_errors
    };
}