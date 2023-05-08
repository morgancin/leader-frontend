import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const usePipelinesStore = defineStore("PipelinesStore", {
    state: () => ({
        pipeline: {},
        pipelines: [],
        pipeline_stages: [],
        message: null,
    }),
    actions: {
        async createPipeline(data) {
            axiosClient.post('/pipelines', data)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updatePipelines() {
            axiosClient.put(`/pipelines/${this.pipeline.id}`, this.pipeline)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchPipeline(id) {
            axiosClient.get(`/pipelines/${id}`)
            .then (({data}) => {
                this.currency = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchPipelines() {
            axiosClient.get('/pipelines')
            .then (({data}) => {
                this.pipelines = data.data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchPipelineStages(pipeline_id) {
            this.pipeline_stages = [];

            if(pipeline_id) {
                await axiosClient.get(`/pipelines/${pipeline_id}/stages`)
                .then (({data}) => {
                    this.pipeline_stages = data.data;
                })
                .catch(function (error) {
                    this.message = error.message;
                })
            }
        },
    }
});