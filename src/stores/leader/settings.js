import { defineStore } from "pinia";
import axiosClient from "../../axios";

import i18n from "../../language/i18n";

export const useSettingsStore = defineStore("SettingsStore", {
    state: () => ({
        setting: {},
        settings: [],
        message: null,
    }),
    actions: {
        async updateProfileLanguage() {
            //axiosClient.patch(`/users/update/profile`, this.setting)
            axiosClient.patch(`/users/profile/update`, this.setting)
            .then (({data}) => {
                this.message = data.message;
                i18n.global.locale.value = this.setting.language;
                sessionStorage.setItem("language", this.setting.language)
            })
            .catch(({error}) => {
                //this.message = "Error";
                //this.message = error.message;
            })
        },
        async fetchUserProfile() {
            axiosClient.get(`/users/profile`)
            .then (({data}) => {
                this.setting = data;
            })
            /*
            .catch(({error}) => {
                //this.message = "Error";
                //this.message = error.message;
            })
            */
        },
    }
});