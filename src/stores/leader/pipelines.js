import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const usePipelinesStore = defineStore("PipelinesStore", {
    state: () => ({
        pipeline: {},
        pipelines: [],
        message: null,
    }),
    actions: {
        async createPipeline(pipeline) {
            axiosClient.post('/pipelines', pipeline)
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
        async fetchPipelines() {
            axiosClient.get('/pipelines')
            .then (({data}) => {
                console.log(data);
                this.pipelines = data.data;
            })
            .catch(function (error) {
                console.log(error);
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
    }
});