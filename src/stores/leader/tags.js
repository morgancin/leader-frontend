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
            axiosClient.post('/tags/register', tag)
            .then (({data}) => {
                return data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchTag(id) {
            axiosClient.get(`/tags/tag/${id}`)
            .then (({data}) => {
                //return data;
                this.tag = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async updateTag() {
            axiosClient.patch(`/tags/update/${this.tag.id}`, this.tag)
            .then (({data}) => {
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchTags() {
            axiosClient.get('/tags/list')
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