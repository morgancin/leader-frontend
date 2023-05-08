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
            account_id:null,
            company_id:null,
            client_origin:null,         //Se recupera con base a client_medium_origin_id
            client_medium_origin_id:null,
            potential_value:0,
            
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
        date_format(date) {
            let d = date;    //new Date();
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);

            return `${ye}-${mo}-${da}`;
        },
        async createProspectActivity(data_) {
            let data = { ...data_ };

            //let d = data.start_date;    //new Date();
            //let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            //let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            //let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
            //data.start_date = `${ye}-${mo}-${da}`;
            if(data.birth_date != null)
                data.birth_date = this.date_format(data.birth_date);

            //data.start_date = this.date_format(data.start_date);    //`${ye}-${mo}-${da}`;
            //data.start_time = data.start_time.hours + ':' + data.start_time.minutes;
            
            data.activity_date = this.date_format(data.start_date) + ' ' + (data.start_time.hours + ':' + data.start_time.minutes);

            axiosClient.post('/activity-prospect', data)
            .then (({data}) => {
                //this.company = data.result;
                //this.message = data.message;
            })
            .catch(({error}) => {
                this.message = "Error"; //error.message;
                //this.message = error.message;
            })
        },
        async fetchProspect(id) {
            axiosClient.get(`/prospects/${id}`)
            .then (({data}) => {
                this.prospect = data;
            })
            .catch(({error}) => {
                this.message = "Error"; //error.message;
                //this.message = error.message;
            })
        },
        async fetchOrigins() {
            let result = [];

            await axiosClient.get(`/prospecting-sources`)
            .then (({data}) => {
                //this.message = data.message;
                result = data.data;
            })
            .catch(({error}) => {
                this.message = "Error"; //error.message;
                //this.message = error.message;
            })

            return result;
        },
        async fetchOriginsMediums(prospecting_source_id) {
            let result = [];

            if(prospecting_source_id) {
                await axiosClient.get(`/prospecting-means?prospecting_source_id=${prospecting_source_id}`)
                .then (({data}) => {
                    //this.message = data.message;
                    result = data.data;
                })
                .catch(({error}) => {
                    this.message = "Error";
                    //this.message = error.message;
                })
            }

            return result;
        },
        async fetchCp() {
            axiosClient.get(`/commons/get-zip-code/${this.prospect.zipcode}`)
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
            ///
            //let d = this.prospect.birth_date;
            //let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            //let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            //let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
            ////

            axiosClient.get(`/commons/get-curp?gender=${this.prospect.gender}&last_name=${this.prospect.last_name}&first_name=${this.prospect.first_name}&birth_date=${this.date_format(this.prospect.birth_date)}&birth_place=${this.prospect.birth_place}&second_last_name=${this.prospect.second_last_name}`)
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