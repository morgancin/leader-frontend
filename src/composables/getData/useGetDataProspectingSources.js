import { ref, readonly } from 'vue';
import axiosClient from "../../axios";

export function useGetDataProspectingSources()
{
    const fetchProspectingSources = async () => {
        return await axiosClient.get('/prospecting-sources')
        .then (({data}) => {
            return data.data;
        })
        .catch(function (err) {
            return err;
        })
    };

    const fetchProspectingMeans = async (prospecting_source_id) => {
        return await axiosClient.get(`/prospecting-means?prospecting_source_id=${prospecting_source_id}`)
        .then (({data}) => {
            return data.data;
        })
        .catch(function (err) {
            return err;
        })
    };

    const fetchProspectingMean = async (id) => {
        return await axiosClient.get(`/prospecting-means/${id}`)
        .then (({data}) => {
            return data.data;
        })
        .catch(function (err) {
            return err;
        })
    };

    return {
        fetchProspectingSources,
        fetchProspectingMeans,
        fetchProspectingMean
    };
}