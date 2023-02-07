import axios from "axios";
import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useUsersStore = defineStore("UsersStore", {
    state: () => ({
        user: {},
        users: [],
        message: null,
    }),
    actions: {
        async createUser(user) {
            axiosClient.post('/users/register', user)
            .then (({data}) => {
                return data;
                //user: {}
            })
            .catch((error) => {
                this.message = error.message;
            })
        },

        async fetchUser(id) {
            axiosClient.get(`/users/user`)
            .then (({data}) => {
                //return data;
                this.user = data;
            })
            .catch((error) => {
                this.message = error.message;
            })
            /*
            this.error = null;
            this.loading = true;
            try {
                this.course = await fetch(`${API_URL}/${id}`).then(res => res.json());
            } catch (e) {
                this.error = e;
            } finally {
                this.loading = false;
            }
            */
        },

        async updateUser(user) {
            axiosClient.patch(`/users/update`, user)
            .then (({data}) => {
                this.user = data.result;
                this.message = data.message;
            })
            .catch((error) => {
                this.message = error.message;
            })

            /*
            ///EJEMPLO DE ERROR, sacado del curso de DevTaller
            .catch(error){
                hasError.value=true;
                if(axios.isAxiosError(error)){
                    return errorMessage.value = error.message;
                }
            }
            */
        },
        
        async deleteUser(id) {
            this.message = 'heyyy';
            /*
            axiosClient.delete(`/users/${id}`)
            .then (({data}) => {
                this.user = data.result;
                this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
            */

            
            /*
            this.error = null;
            this.loading = true;
            try {
                await fetch(`${API_URL}/${id}`, {
                    method: "DELETE",
                });
                await this.fetchCourses();
            } catch (e) {
                this.error = e;
            } finally {
                this.loading = false;
            }
            */
        }
    }
});
