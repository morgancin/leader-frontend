import axios from "axios";
import { defineStore } from "pinia";
import axiosClient from "../../axios";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import router from "@/router";

export const useTeamsStore = defineStore("TeamsStore", {
    state: () => ({
        team: {},
        teams: []
    }),
    actions: {
        async createTeam(team) {
            axiosClient.post('/teams', team)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/teams' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchTeams() {
            axiosClient.get('/teams')
            .then (({data}) => {
                this.users = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async fetchTeam(id) {
            axiosClient.get(`/teams/${id}`)
            .then (({data}) => {
                this.team = data.data;
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        },
        async updateTeam() {
            axiosClient.put(`/teams/${this.team.id}`, this.team)
            .then (({data}) => {
                toast.success(data.message, {
                    autoClose:1000
                });
                
                router.push({ path: '/teams' });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    autoClose:1000
                });
            })
        }
    }
});
