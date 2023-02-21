import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useUserRequest()
{
    // data
    
    const payload = ref(null);
    const loading = ref(false);

    // methods
    /*
    const makeRequest = async (url) => {
        loading.value = true;
        const res = await fetch(url);
        payload.value = await res.json();
    };
    */

    const createUser = async (user) => {
        axiosClient.post('/users', user)
        .then (({data}) => {
            return data;
            //user: {}
        })
        .catch(function (error) {
            this.message = error.message;
        })
    };

    /*
    async createUser(user) {
            axiosClient.post('/users/register', user)
            .then (({data}) => {
                return data;
                //user: {}
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    */

    // exposed
    return {
        payload: readonly(payload), //notice the readonly here
        loading: readonly(loading), // and here
        makeRequest
    };

    /*
    const error = ref(null);
    const results = ref(null);

    const fetchTags = async (cType) => {
        results.value = [];
        
        await axiosClient.get(`/tags/list/${cType}`)
        .then (({data}) => {
            results.value = data;
        })
        .catch(function (err) {
            error.value = err;
        })
    };

    const makeRequest = async (API_URL) => {
        try{
            const request = await (await fetch(API_URL)).json();
            results.value = request;

        } catch (err){
            console.log(err);
            error.value = err;
        }
    };
    
    return{
        fetchTags,
        results: readonly(results),
        error,
    };
    */
}