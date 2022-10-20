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
            <tr v-for="prospecto in prospectos" :key="prospecto">
                <td class="whitespace-nowrap">{{ prospecto.name }}</td>
                <td class="whitespace-nowrap">{{ prospecto.firstname }}</td>
                <td class="whitespace-nowrap">{{ prospecto.lastname }}</td>
                <td class="whitespace-nowrap">{{ prospecto.mobilephone }}</td>
                <td class="whitespace-nowrap">{{ prospecto.homephone }}</td>
                <td class="whitespace-nowrap">{{ prospecto.officephone }}</td>
                <td class="whitespace-nowrap">{{ prospecto.extension }}</td>
                <td class="whitespace-nowrap">{{ prospecto.profession }}</td>
                <td class="whitespace-nowrap">{{ prospecto.date }}</td>
                <td class="whitespace-nowrap">{{ prospecto.age }}</td>
                <td class="whitespace-nowrap">{{ prospecto.gender }}</td>
                <td class="whitespace-nowrap">{{ prospecto.city }}</td>
                <td class="whitespace-nowrap">{{ prospecto.curp }}</td>
                <td class="whitespace-nowrap">{{ prospecto.rfc }}</td>
                <td class="whitespace-nowrap">{{ prospecto.prospectingorigin }}</td>
                <td class="whitespace-nowrap">{{ prospecto.prospectingmedium }}</td>
            </tr>
        </tbody>
    </table>
</div>

  <!-- Form add prospect -->
  <form @submit.prevent="addProspect">
    <div
      class="mt-5 grid auto-rows-auto grid-flow-dense gap-4 xl:grid-cols-3 lg:grid-cols-3  md:grid-cols-2  sm:grid-cols-1">
      <!-- Name -->
      <div class="mt-3">
        <input id="name" v-model="name" type="text" class="form-control" placeholder="Name *" required />
      </div>
      <!-- Fist Name -->
      <div class="mt-3">
        <input id="firstname" v-model="firstname" type="text" class="form-control"
          placeholder="Fist Name *" required />
      </div>
      <!-- Last Name -->
      <div class="mt-3">
        <input id="lastname" v-model="lastname" type="text" class="form-control"
          placeholder="Last Name" />
      </div>
      <!-- Mobile Phone -->
      <div class="mt-3 ">
        <input id="mobilephone" v-model="mobilephone" type="number" class="form-control"
          placeholder="Mobile Phone *" required />
      </div>
      <!-- Home Phone -->
      <div class="mt-3 ">
        <input id="homephone" v-model="homephone" type="number" class="form-control"
          placeholder="Home Phone" />
      </div>
      <!-- Office Phone -->
      <div class="mt-3">
        <input id="officephone" v-model="officephone" type="number" class="form-control"
          placeholder="Office Phone" />
      </div>
      <!-- Extension -->
      <div class="mt-3">
        <input id="extension" v-model="extension" type="number" class="form-control" placeholder="Extensión" />
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
        <input id="age" v-model="age" type="text" class="form-control" placeholder="Age" required minlength="1" maxlength="2" />
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
          <!-- <option value="">Seleccione una opción</option> -->
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

<script >
import { ref } from "vue";
// const deleteConfirmationModal = ref(false);
const headerFooterModalPreview = ref(false);

export default {
  name: 'Main',
  data(){
    return {
      name: '',
      firstname: '',
      lastname: '',
      mobilephone: '',
      homephone: '',
      officephone: '',
      extension: '',
      profession: '',
      date: '',
      age: 0,
      gender: null,
      city: '',
      curp: '',
      rfc: '',
      prospectingorigin: '',
      prospectingmedium: '',
      suscrito: false,
      prospectos: [],
    }
  },
  methods: {
    addProspect(){
      // const prospectos = []
      const data = {
        name: this.name,
        firstname: this.firstname,
        lastname: this.lastname,
        mobilephone: this.mobilephone,
        homephone: this.homephone,
        officephone: this.officephone,
        extension: this.extension,
        profession: this.profession,
        date: this.date,
        age:this.age,
        gender: this.gender,
        city: this.city,
        curp: this.curp,
        rfc: this.rfc,
        prospectingorigin: this.prospectingorigin,
        prospectingmedium: this.prospectingmedium,
      }
        this.prospectos.push(data)
        this.name = '',
        this.firstname = '',
        this.lastname = '',
        this.mobilephone = '',
        this.homephone = '',
        this.officephone = '',
        this.extension = '',
        this.profession = '',
        this.date = '',
        this.age = '',
        this.gender = '',
        this.city = '',
        this.curp = '',
        this.rfc = '',
        this.prospectingorigin = '',
        this.prospectingmedium = ''     
    }
  }
}
</script>
