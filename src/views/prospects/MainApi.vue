<template>
  <h2 class="intro-y text-lg font-medium mt-10">Agregar nuevo Prospecto</h2>
<!-- Table of Contents -->
  <div class="overflow-x-auto mt-5">
    <table class="table">
        <thead>
            <tr>
                <th class="whitespace-nowrap">Name</th>
                <th class="whitespace-nowrap">Fist Name</th>
                <th class="whitespace-nowrap">Last Name</th>
                <th class="whitespace-nowrap">Mobile Phone</th>
                <th class="whitespace-nowrap">Home Phone</th>
                <th class="whitespace-nowrap">Office Phone</th>
                <th class="whitespace-nowrap">Extension</th>
                <th class="whitespace-nowrap">Profession</th>
                <th class="whitespace-nowrap">Fecha de nacimiento</th>
                <th class="whitespace-nowrap">Age</th>
                <th class="whitespace-nowrap">Gender</th>
                <th class="whitespace-nowrap">City</th>
                <th class="whitespace-nowrap">CURP</th>
                <th class="whitespace-nowrap">RFC</th>
                <th class="whitespace-nowrap">Origen de prospección</th>
                <th class="whitespace-nowrap">Priority</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="prospect in prospects" :key="prospect">
                <td class="whitespace-nowrap">{{ prospect.name }}</td>
                <td class="whitespace-nowrap">{{ prospect.firstname }}</td>
                <td class="whitespace-nowrap">{{ prospect.lastname }}</td>
                <td class="whitespace-nowrap">{{ prospect.mobilephone }}</td>
                <td class="whitespace-nowrap">{{ prospect.homephone }}</td>
                <td class="whitespace-nowrap">{{ prospect.officephone }}</td>
                <td class="whitespace-nowrap">{{ prospect.extension }}</td>
                <td class="whitespace-nowrap">{{ prospect.profession }}</td>
                <td class="whitespace-nowrap">{{ prospect.date }}</td>
                <td class="whitespace-nowrap">{{ prospect.age }}</td>
                <td class="whitespace-nowrap">{{ prospect.gender }}</td>
                <td class="whitespace-nowrap">{{ prospect.city }}</td>
                <td class="whitespace-nowrap">{{ prospect.curp }}</td>
                <td class="whitespace-nowrap">{{ prospect.rfc }}</td>
                <td class="whitespace-nowrap">{{ prospect.prospectingorigin }}</td>
                <td class="whitespace-nowrap">{{ prospect.prospectingmedium }}</td>
            </tr>
        </tbody>
    </table>
</div>

  <!-- Form add prospect -->
  <form @submit.prevent="addProspect" autocomplete="on">
    <div
      class="mt-5 grid auto-rows-auto grid-flow-dense gap-4 xl:grid-cols-3 lg:grid-cols-3  md:grid-cols-2  sm:grid-cols-1">
      <!-- Name -->
      <div class="mt-3">
        <input v-model="name" type="text" class="form-control" placeholder="Name *" required />
      </div>
      <!-- Fist Name -->
      <div class="mt-3">
        <input v-model="firstname" type="text" class="form-control" placeholder="Fist Name *" required />
      </div>
      <!-- Last Name -->
      <div class="mt-3">
        <input v-model="lastname" type="text" class="form-control"
          placeholder="Last Name" />
      </div>
      <!-- Mobile Phone -->
      <div class="mt-3 ">
        <input v-model.number="mobilephone" type="number" class="form-control"
          placeholder="Mobile Phone *" required />
      </div>
      <!-- Home Phone -->
      <div class="mt-3 ">
        <input v-model.number="homephone" type="number" class="form-control"
          placeholder="Home Phone" />
      </div>
      <!-- Office Phone -->
      <div class="mt-3">
        <input id="officephone" v-model.number="officephone" type="number" class="form-control"
          placeholder="Office Phone" />
      </div>
      <!-- Extension -->
      <div class="mt-3">
        <input id="extension" v-model.number="extension" type="number" class="form-control" placeholder="Extensión" />
      </div>
      <!-- Profession -->
      <div class="mt-3">
        <select  class="form-control" placeholder="profession" v-model="profession">
          <option value="">Profession</option>
          <option value="Abogado">ABOGADO</option>
          <option value="Ama de casa">AMA DE CASA</option>
          <option value="Arquitecto">ARQUITECTO</option>
          <option value="Comerciante">COMERCIANTE</option>
          <option value="Consultor">CONSULTOR</option>
          <option value="Contador">CONTADOR</option>
          <option value="Dentista">DENTISTA</option>
          <option value="Empleado Gobierno">EMPLEADO GOBIERNO</option>
          <option value="Empleado IP">EMPLEADO IP</option>
          <option value="Empresario">EMPRESARIO</option>
          <option value="Enfermera">ENFERMERA</option>
          <option value="Ingeniero">INGENIERO</option>
          <option value="Médico">MÉDICO</option>
          <option value="Profesionista">PROFESIONISTA</option>
        </select>
      </div>
      <!-- Fecha de nacimiento -->
      <div class="mt-3">
        <Litepicker id="date" v-model="date" :options="{
                  autoApply: false,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1950,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }" class="form-control" placeholder="Fecha de nacimiento" />
      </div>
      <!-- Age -->
      <div class="mt-3">
        <input id="age" v-model.number="age" type="number" class="form-control" placeholder="Age" required minlength="1" maxlength="2" />
      </div>
      <!-- Gender -->
      <div class="mt-3">
        <label>Gender</label>
        <div class="flex flex-col sm:flex-row mt-2">
          <div class="form-check mr-2">
            <input id="feminine" v-model="gender" class="form-check-input" type="radio" name="horizontal_radio_button"
              value="Feminine" />
            <label class="form-check-label" for="feminine">Feminine</label>
          </div>
          <div class="form-check mr-2 mt-2 sm:mt-0">
            <input id="male" v-model="gender" class="form-check-input" type="radio" name="horizontal_radio_button"
              value="Male" />
            <label class="form-check-label" for="male">Male</label>
          </div>
        </div>
      </div>
      <!-- City -->
      <div class="mt-3">
        <select  class="form-control" v-model="city">
          <option disabled value="" >City</option>
          <option value="">Seleccione una opción</option>
          <option value="Aguacalientes">Aguacalientes</option>
          <option value="Baja California">Baja California</option>
          <option value="Baja California Sur">Baja California Sur</option>
          <option value="Campeche">Campeche</option>
          <option value="Chiapas">Chiapas</option>
          <option value="Chihuahua">Chihuahua</option>
          <option value="Ciudad de México">Ciudad de México</option>
          <option value="Coahuila">Coahuila</option>
          <option value="Colima">Colima</option>
          <option value="Durango">Durango</option>
          <option value="Estado de México">Estado de México</option>
          <option value="Extranjero">Extranjero</option>
          <option value="Guanajuato">Guanajuato</option>
          <option value="Guerrero">Guerrero</option>
          <option value="Hidalgo">Hidalgo</option>
          <option value="Jalisco">Jalisco</option>
          <option value="Michoacan">Michoacan</option>
          <option value="Morelos">Morelos</option>
          <option value="Nayarit">Nayarit</option>
          <option value="Nuevo León">Nuevo León</option>
          <option value="Oaxaca">Oaxaca</option>
          <option value="Puebla">Puebla</option>
          <option value="Querétaro">Querétaro</option>
          <option value="Quintana Roo">Quintana Roo</option>
          <option value="San Luis Potosi">San Luis Potosi</option>
          <option value="Sinaloa">Sinaloa</option>
          <option value="Sonora">Sonora</option>
          <option value="Tabasco">Tabasco</option>
          <option value="Tamaulipas">Tamaulipas</option>
          <option value="Tlaxcala">Tlaxcala</option>
          <option value="Veracruz">Veracruz</option>
          <option value="Yucatan">Yucatan</option>
          <option value="Zacatecas">Zacatecas</option>
        </select>
      </div>
      <!-- CURP -->
      <div class="mt-3">
        <input id="curp" v-model="curp" type="text" class="form-control" placeholder="CURP" />
      </div>
      <!-- RFC -->
      <div class="mt-3">
        <input id="rfc"  v-model="rfc" type="text" class="form-control" placeholder="RFC" />
      </div>
      <!-- Prospección -->
      <div class="mt-3">
        <select class="form-control" placeholder="Origen de prospección *" v-model="prospectingorigin">
          <option disabled value="">Prospecting Origin</option>
          <option value="Cartera Propia">CARTERA PROPIA</option>
          <option value="Casas Funerarias">CASAS FUNERARIAS</option>
          <option value="Centros Comerciales">CENTROS COMERCIALES</option>
          <option value="Conferencias">CONFERENCIAS</option>
          <option value="Empresas">EMPRESAS</option>
          <option value="En línea">EN LINEA</option>
          <option value="Eventos">EVENTOS</option>
          <option value="Exposiciones">EXPOSICIONES</option>
          <option value="Facebook">FACEBOOK</option>
          <option value="Hospitales">HOSPITALES</option>
          <option value="Iglesias">IGLESIAS</option>
          <option value="Mercado Público">MERCADO PUBLICO</option>
          <option value="Metrobus">METROBUS</option>
          <option value="Mexicraneos">MEXICRANEOS</option>
          <option value="Oficina Corporativo">OFICINA CORPORATIVO</option>
          <option value="Otros">OTROS</option>
          <option value="Panteones">PANTEONES</option>
          <option value="Prensa">PRENSA</option>
          <option value="PRIDE CDMX 2022">PRIDE CDMX 2022</option>
          <option value="Programas de Radio">PROGRAMAS DE RADIO</option>
          <option value="Radio">RADIO</option>
          <option value="Redes Sociales">REDES SOCIALES</option>
          <option value="Santa Gloria">SANTA GLORIA</option>
          <option value="Telemarketing">TELEMARKETING</option>
          <option value="Televisión">TELEVISION</option>
          <option value="Temporada Nov 2021">TEMPORADA NOV 2021</option>
          <option value="Webinar BBF">WEBINAR BBF</option>
        </select>
      </div>
      <!-- Priority -->
      <div class="mt-3">
        <select  class="form-control" placeholder="Priority" v-model="prospectingmedium">
          <option disabled value="">Prospecting Medium</option>
            <option value="Bajo">Bajo</option>
            <option value="Medio">Medio</option>
            <option value="Alto">Alto</option>
            <option value="Pendiente">Pendiente</option>
        </select>
      </div>
      <!-- Suscripción -->
      <div class="form-check mt-5">
        <input id="suscripcion" class="form-check-input" type="checkbox" v-model="suscrito" />
        <label class="form-check-label" for="suscripcion">The prospect agrees to receive emails</label>
      </div>
      <button type="submit" class="btn btn-primary mt-5">Save</button>
    </div>
  </form>
  
</template>

<script setup>
import { ref } from "vue";
import axios from "axios"
import axiosClient from "../../axios";

// const deleteConfirmationModal = ref(false);
const headerFooterModalPreview = ref(false);

const name = ref('')
const firstname = ref('')
const lastname = ref('')
const mobilephone = ref('')
const homephone = ref('')
const officephone = ref('')
const extension = ref('')
const profession = ref('')
const date = ref('')
const age = ref(0)
const gender = ref(null)
const city = ref('')
const curp = ref('')
const rfc = ref('')
const prospectingorigin = ref('')
const prospectingmedium = ref('')
const suscrito = ref(false)
const prospects = ref([])



// async const addProspect = () => {
//     userStore.loginUser(email.value, password.value);
//   }
  
async function addProspect(){

const dataProspect = {
  name: name.value,
  firstname: firstname.value,
  lastname: lastname.value,
  mobilephone: mobilephone.value,
  homephone: homephone.value,
  officephone: officephone.value,
  extension: extension.value,
  profession: profession.value,
  email: 'pruebas@pruebas.com',
  password: 'Test123!',
  password_confirmation: 'Test123!',
  servicepriority: 'EMPRESAS',
  state: 'Alcaldía Cuauhtémoc',
  date: date.value,
  age: age.value,
  gender: gender.value,
  city: city.value,
  curp: curp.value,
  rfc: rfc.value,
  prospectingorigin: prospectingorigin.value,
  prospectingmedium: prospectingmedium.value,
  // suscrito: suscrito.value,
  // prospects: prospects.value,
  role: "client",
}

  axiosClient.post('/register', dataProspect)
    .then(({data}) => {
      console.log(data)
      return data;
    })
}

  

// export default {
//   data(){
//     return {
//       form: {
//         name: '',
//         firstname: '',
//         lastname: '',
//         mobilephone: '',
//         homephone: '',
//         officephone: '',
//         extension: '',
//         profession: '',
//         date: '',
//         age: 0,
//         gender: null,
//         city: '',
//         curp: '',
//         rfc: '',
//         prospectingorigin: '',
//         prospectingmedium: '',
//         suscrito: false,
//         // prospectos: [],
//       }
//     }
//   }, 
//   methods: {
//     async getUser(){
//       // let datos = await axios.get('https://jsonplaceholder.typicode.com/users')
//       // let datos = await axios.get('https://api.leader.arkanmedia.com/api/users/client')
//       axiosClient.get('/users/client')
//         .then(({data}) => {
//           console.log(data)
//           return data;
//         })
//       //   async function doPostRequest() {
//       //     let payload = { 
//       //       name: 'José García',
//       //       firstname: 'José',
//       //       lastname: 'García',
//       //       mobilephone: '5556581111',
//       //       homephone: '5556581112',
//       //       officephone: '5556581113',
//       //       extension: '123',
//       //       profession: 'ABOGADO',
//       //       date: '',
//       //       age: 0,
//       //       gender: null,
//       //       city: 'Ciudad de México',
//       //       curp: 'GAGJM800805HDFRRZ01',
//       //       rfc: 'GAGJM800805HDFRRZ01',
//       //       prospectingorigin: 'OTROS',
//       //       prospectingmedium: 'Bajo',
//       //       suscrito: false, 
//       //     };
//       //     let res = await axiosClient.post('/users/client', payload);
//       //     let data = res.data;
//       //     console.log(data);
//       // }
//       // doPostRequest()
//     },
   
//     // save(){
//     //   async function doPostRequest() {
//     //     let payload =  {
//     //     name: '',
//     //     firstname: '',
//     //     lastname: '',
//     //     mobilephone: '',
//     //     homephone: '',
//     //     officephone: '',
//     //     extension: '',
//     //     profession: '',
//     //     date: '',
//     //     age: 0,
//     //     gender: null,
//     //     city: '',
//     //     curp: '',
//     //     rfc: '',
//     //     prospectingorigin: '',
//     //     prospectingmedium: '',
//     //     suscrito: false,
//     //     // prospectos: [],
//     //   };
//     //     let res = await axiosClient.post('/client', payload);
//     //     let data = res.data;
//     //     console.log(data);
//     // }
//     //   axiosClient.post("url", this.form)
//     //   console.log('Save')
//     //   console.log(this.form)
//     // }

//   },
//   created(){
//     this.getUser()
//   }
// }



// export default {
//   name: 'Main',
//   data(){
//     return {
//       name: '',
//       firstname: '',
//       lastname: '',
//       mobilephone: '',
//       homephone: '',
//       officephone: '',
//       extension: '',
//       profession: '',
//       date: '',
//       age: 0,
//       gender: null,
//       city: '',
//       curp: '',
//       rfc: '',
//       prospectingorigin: '',
//       prospectingmedium: '',
//       suscrito: false,
//       prospectos: [],

//     }
//   }, 
 
//   methods: {
//     addProspect(){
//       // const prospectos = []
//       const data = {
//         name: this.name,
//         firstname: this.firstname,
//         lastname: this.lastname,
//         mobilephone: this.mobilephone,
//         homephone: this.homephone,
//         officephone: this.officephone,
//         extension: this.extension,
//         profession: this.profession,
//         date: this.date,
//         age:this.age,
//         gender: this.gender,
//         city: this.city,
//         curp: this.curp,
//         rfc: this.rfc,
//         prospectingorigin: this.prospectingorigin,
//         prospectingmedium: this.prospectingmedium,
//       }
//         this.prospectos.push(data)
//         this.name = '',
//         this.firstname = '',
//         this.lastname = '',
//         this.mobilephone = '',
//         this.homephone = '',
//         this.officephone = '',
//         this.extension = '',
//         this.profession = '',
//         this.date = '',
//         this.age = '',
//         this.gender = '',
//         this.city = '',
//         this.curp = '',
//         this.rfc = '',
//         this.prospectingorigin = '',
//         this.prospectingmedium = ''     
//     }
//   }
// }
</script>
