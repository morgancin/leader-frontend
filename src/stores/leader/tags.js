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