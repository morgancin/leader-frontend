import { defineStore } from "pinia";
import axiosClient from "../../axios";

export const useProspectsStore = defineStore("ProspectsStore", {
    state: () => ({
        step : 1,
        message: null,
        prospects: [],
        dataSuburb: [],
        prospect: {
            first_name:null,
            last_name:null,
            second_last_name:null,
            client_origin:null,         //Se recupera con base a client_medium_origin_id
            client_medium_origin_id:null,
            
            age:null,
            rfc:null,
            curp:null,
            email:null,
            gender:null,
            extension:null,
            birth_date:null,
            phone_home:null,
            profession:null,
            birth_place:null,
            phone_office:null,
            phone_mobile:null,
            service_priority:null,

            city:null,
            town:null,
            state:null,
            alias:null,//Por default se pone register/default
            street:null,
            indoor:null,
            suburb:null,
            outdoor:null,
            country:null,
            zipcode:null,
        },
    }),
    actions: {
        async createProspectActivity(data) {
            //data.end_time = data.end_time.hours + ':' + data.end_time.minutes;
            //data.end_date = new Date(data.end_date).toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' });
            //data.activity_date = new Date(data.activity_date).toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' });
            data.start_time = data.start_time.hours + ':' + data.start_time.minutes;
            data.start_date = new Date(data.start_date).toLocaleDateString("en-CA", { year: 'numeric', month: 'numeric', day: 'numeric' });
            
            axiosClient.post('/clients/activity/register', data)
            .then (({data}) => {
                //this.company = data.result;
                //this.message = data.message;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchProspect(id) {
            axiosClient.get(`/clients/client/${id}`)
            .then (({data}) => {
                this.prospect = data;
            })
            .catch(function (error) {
                this.message = error.message;
            })
        },
        async fetchOrigins() {
            let result = [];

            await axiosClient.get(`/clients/origins/list`)
            .then (({data}) => {
                //this.message = data.message;
                result = data.data;
            })
            .catch(function (error) {
                this.message = error.message;
            })

            return result;
        },
        async fetchOriginsMediums() {
            let result = [];

            if(this.prospect.client_origin){
                await axiosClient.get(`/clients/origins/mediums/list/${this.prospect.client_origin}`)
                .then (({data}) => {
                    //this.message = data.message;
                    result = data.data;
                })
                .catch(function (error) {
                    this.message = error.message;
                })

            }else{
                this.prospect.client_medium_origin_id = null;
            }

            return result;
        },
        async fetchCp() {
            axiosClient.get(`/fetch/data/cp/${this.prospect.zipcode}`)
            .then (({data}) => {
                //this.message = data.message;
                //this.dataOriginsMediums = data;
                this.prospect.city = data.ciudad;
                this.prospect.state = data.estado;
                this.prospect.country = data.pais;
                this.prospect.town = data.municipio;
                this.dataSuburb = data.asentamiento;
            })
            .catch(({error}) => {
                this.message = "Error";
                //this.message = error.message;
            })
        },
        async fetchCurp() {
            const fieldsCurp = {
                gender: this.prospect.gender,
                last_name: this.prospect.last_name,
                first_name: this.prospect.first_name,
                birth_date: this.prospect.birth_date,
                birth_place: this.prospect.birth_place,
                second_last_name: this.prospect.second_last_name,
            }
            
            axiosClient.post(`/fetch/curp`, fieldsCurp)
            .then (({data}) => {
                //this.message = data.message;
                //this.dataOriginsMediums = data;
                this.prospect.curp = data;
            })
            .catch(({error}) => {
                this.message = "Error";
                //this.message = error.message;
            })
        },
    }
});