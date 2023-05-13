import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useTagsStore = defineStore("TagsStore", {
    state: () => ({
        tag: {},
        tags: []
    }),
    actions: {
        async createTags(tag) {
            axiosClient.post('/tags', tag)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/tags' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchTag(id) {
            axiosClient.get(`/tags/${id}`)
            .then (({data}) => {
                this.tag = data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updateTag() {
            axiosClient.put(`/tags/${this.tag.id}`, this.tag)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/tags' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchTags() {
            axiosClient.get('/tags')
            .then (({data}) => {
                this.tags = data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
    }
});