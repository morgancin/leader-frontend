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
            propecting_source_id:null,
            propecting_mean_id:null,
            potential_value:0,
            age:null,
            tax_id:null,
            population_reg:null,
            email:null,
            gender:null,
            extension:null,
            birth_date:null,
            phone_home:null,
            profession:null,
            birth_place:null,
            phone_office:null,
            phone_mobile:null,
            priority:null,
            tags:null,

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

            if (data.birth_date != null)
                data.birth_date = this.date_format(data.birth_date);

            data.activity_date = this.date_format(data.start_date) + ' ' + (data.start_time.hours + ':' + data.start_time.minutes);

            axiosClient.post('/activity-prospect', data)
            .then (({data}) => {

            })
            .catch(({error}) => {
                this.message = "Error";
            })
        },
        async fetchProspect(id) {
            axiosClient.get(`/prospects/${id}`)
            .then (({data}) => {
                this.prospect = data;
            })
            .catch(({error}) => {
                this.message = "Error";
            })
        },
        async fetchCp() {
            axiosClient.get(`/commons/get-zip-code/${this.prospect.zipcode}`)
            .then (({data}) => {
                this.prospect.city = data.ciudad;
                this.prospect.state = data.estado;
                this.prospect.country = data.pais;
                this.prospect.town = data.municipio;
                this.dataSuburb = data.asentamiento;
            })
            .catch(({error}) => {
                this.message = "Error";
            })
        },
        async fetchCurp() {
            axiosClient.get(`/commons/get-curp?gender=${this.prospect.gender}&last_name=${this.prospect.last_name}&first_name=${this.prospect.first_name}&birth_date=${this.date_format(this.prospect.birth_date)}&birth_place=${this.prospect.birth_place}&second_last_name=${this.prospect.second_last_name}`)
            .then (({data}) => {
                this.prospect.curp = data;
            })
            .catch(({error}) => {
                this.message = "Error";
            })
        },
    }
});