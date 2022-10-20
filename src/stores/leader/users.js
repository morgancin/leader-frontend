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
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchUser(id) {
            axiosClient.get(`/users/user`)
            .then (({data}) => {
                //return data;
                this.user = data;
            })
            .catch(function (error) {
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
            .catch(function (error) {
                this.message = error.message;
            })

            /*
            this.error = null;
            this.loading = true;
            try {
                await fetch(`${API_URL}/${course.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(course),
                });
            } catch (e) {
                this.error = e;
            } finally {
                this.loading = false;
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
