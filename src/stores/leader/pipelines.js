import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const usePipelinesStore = defineStore("PipelinesStore", {
    state: () => ({
        pipeline: {},
        pipelines: [],
        pipeline_stages: []
    }),
    actions: {
        async createPipeline(data) {
            axiosClient.post('/pipelines', data)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/pipelines' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updatePipelines() {
            axiosClient.put(`/pipelines/${this.pipeline.id}`, this.pipeline)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/pipelines' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchPipeline(id) {
            axiosClient.get(`/pipelines/${id}`)
            .then (({data}) => {
                this.currency = data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchPipelines() {
            axiosClient.get('/pipelines')
            .then (({data}) => {
                this.pipelines = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchPipelineStages(pipeline_id) {
            this.pipeline_stages = [];

            if(pipeline_id) {
                await axiosClient.get(`/pipelines/${pipeline_id}/stages`)
                .then (({data}) => {
                    this.pipeline_stages = data.data;
                })
                .catch((error) => {
                    toast.error(error.response.data.message, {
                        autoClose:1000
                    });
                })
            }
        },
    }
});