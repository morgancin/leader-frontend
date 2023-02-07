import { defineStore } from "pinia";

import axiosClient from "../../axios";
import router from "@/router";

import i18n from "../../language/i18n";

export const useAuthStore = defineStore("AuthStore", {
    state: () => ({
        //company: {},
        //companies: [],
        message: null,
        user:{
            data:{},
            token: sessionStorage.getItem("TOKEN"),
        }
    }),
    actions: {
        async loginUser(userData) {
            axiosClient.post(`/login`, userData)
            .then (({data}) => {
                //this.user.data = data.user;
                //sessionStorage.setItem("user", data.user.id);
                //this.company = data;

                this.user.token = data.token;

                //app.globalProperties.global_property_user = this.user.token;
                //app.config.global_property_user = this.user.token;
                 //this.global_property_user = this.user.token;
                //globalThis.global_property_user = 'heyyyyy';
                //this.global.global_property_user = 'heyyyyy';
                //this.global_property_user = 'heyyyyy';
                //this.$global_property_user = 'heyyyyy';
                
                sessionStorage.setItem("TOKEN", this.user.token);
                sessionStorage.setItem("language", data.user.profile.language);
                sessionStorage.setItem("session_storage_user", this.user.token);

                i18n.global.locale.value = data.user.profile.language;
                
                router.push({
                    name: "side-menu-dashboard-overview-1",
                })
            })
            /*
            .catch(function (error) {
                this.message = error;
            })
            
            finally {
                this.loadingUser = false;
            }
            */
        },
    }
});