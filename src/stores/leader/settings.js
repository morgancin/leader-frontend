import { defineStore } from "pinia";
import axiosClient from "../../axios";

import i18n from "../../language/i18n";

export const useSettingsStore = defineStore("SettingsStore", {
    state: () => ({
        message: null,
    }),
    actions: {
        async updateProfileLanguage(setting) {
            axiosClient.put(`/profiles/${setting.id}`, setting)
            .then (({data}) => {
                this.message = data.message;
                i18n.global.locale.value = setting.language;
                sessionStorage.setItem("language", setting.language)
            })
            .catch(({error}) => {
                //this.message = "Error";
                //this.message = error.message;
            })
        }
    }
});