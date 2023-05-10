import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDatasTags()
{
    const fetchTags = async () => {
        return await axiosClient.get(`/tags`)
        .then (({data}) => {
            return data.data;
        })
        .catch(({error}) => {
            return error;
        })
    };

    return{
        fetchTags
    };
}