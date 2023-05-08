import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useDashboardStore = defineStore("DashboardStore", {
    state: () => ({
        message: null,
        pipelines: [],
    }),
    actions: {
        async fetchPipeline(id) {
            let result = [];

            await axiosClient.get(`/pipelines/${id}`)
            .then (({data}) => {
                //this.message = data.message;
                result = data.data;
            })
            .catch(({error}) => {
                this.message = "Error"; //error.message;
                //this.message = error.message;
            })

            return result;
        },
        async fetchPipelineStages(pipeline_id) {
            let result = [];

            await axiosClient.get(`/pipelines/${pipeline_id}/stages`)
            .then (({data}) => {
                //this.message = data.message;
                result = data.data;
            })
            .catch(({error}) => {
                this.message = "Error"; //error.message;
                //this.message = error.message;
            })

            return result;
        },
        async fetchPipelineStageProspects(pipeline_id, pipeline_stage_id) {
            let result = [];

            await axiosClient.get(`/pipelines/${pipeline_id}/stages/${pipeline_stage_id}/prospects`)
            .then (({data}) => {
                //this.message = data.message;
                result = data.data;
            })
            .catch(({error}) => {
                this.message = "Error"; //error.message;
                //this.message = error.message;
            })

            return result;
        },
    }
});