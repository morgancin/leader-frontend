import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useTagsStore = defineStore("TagsStore", {
    state: () => ({
        tag: {},
        tags: [],
        message: null,
    }),
    actions: {
        async createTags(tag) {
            axiosClient.post('/tags', tag)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchTag(id) {
            axiosClient.get(`/tags/${id}`)
            .then (({data}) => {
                //return data;
                this.tag = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateTag() {
            axiosClient.put(`/tags/${this.tag.id}`, this.tag)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchTags() {
            axiosClient.get('/tags')
            .then (({data}) => {
                //return data;
                this.tag = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
    }
});