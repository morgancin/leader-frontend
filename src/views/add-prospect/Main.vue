<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Add Prospect</h2>
  </div>
   <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/prospects`">Prev</router-link>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="intro-y col-span-12 lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <form @submit.prevent="addProspect" autocomplete="on">
        <div class="intro-y box p-5 intro-y grid grid-cols-3 gap-3 mt-5">
          <div class="mt-3">
            <label class="form-label">First Name</label>
            <input v-model="user.firstname" type="text" class="form-control w-full" placeholder="First Name" />
          </div>
          <div class="mt-3">
            <label class="form-label">Last Name</label>
            <input v-model="user.lastname" type="text" class="form-control w-full" placeholder="Last Name" />
          </div>
          <div class="mt-3">
            <label class="form-label">Email</label>
            <input v-model="user.email" type="text" class="form-control w-full" placeholder="Email" />
          </div>
          <div class="mt-3">
            <label class="form-label">Home Phone</label>
            <input v-model.number="user.homephone" type="text" class="form-control w-full" placeholder="Home Phone" />
          </div>
          <div class="mt-3">
            <label class="form-label">Mobile Phone</label>
            <input v-model.number="user.mobilephone" type="text" class="form-control w-full" placeholder="Mobile Phone" />
          </div>
          <div class="mt-3">
            <label class="form-label">Office Phone</label>
            <input v-model.number="user.officephone" type="text" class="form-control w-full" placeholder="Office Phone" />
          </div>
          <div class="mt-3">
            <label class="form-label">Extension</label>
            <input v-model.number="user.extension" type="number" class="form-control" placeholder="Extensión" />
          </div>
          <div class="mt-3">
            <label class="form-label">Profession</label>
            <select class="form-control" placeholder="profession" v-model="user.profession">
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
          <div class="mt-3">
            <label class="form-label">CURP</label>
            <input v-model="user.curp" type="text" class="form-control" placeholder="CURP" />
          </div>
          <div class="mt-3">
            <label class="form-label">RFC</label>
            <input v-model="user.rfc" type="text" class="form-control" placeholder="RFC" maxlength="16"/>
          </div>
          <div class="mt-3">
            <label class="form-label">Service Priority</label>
            <select class="form-control" placeholder="Service Priority" v-model="user.servicepriority">
              <option disabled value="">Service Priority</option>
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
          <div class="mt-3">
            <label class="form-label">Prospect Origin</label>
            <select class="form-control" placeholder="Origen de prospección *" v-model="user.prospectingorigin">
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
          <div class="mt-3">
            <label class="form-label">Prospecting Medium</label>
            <select class="form-control" placeholder="Priority" v-model="user.prospectingmedium">
              <option disabled value="">Prospecting Medium</option>
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
          <div class="mt-3">
            <label class="form-label">Age</label>
            <input v-model.number="user.age" type="number" class="form-control" placeholder="Age" required minlength="1"
              maxlength="2" />
          </div>
          <div class="mt-3">
            <label>Gender</label>
            <div class="flex flex-col sm:flex-row mt-2">
              <div class="form-check mr-2">
                <input v-model="user.gender" class="form-check-input" type="radio" name="horizontal_radio_button"
                  value="Feminine" />
                <label class="form-check-label" for="feminine">Feminine</label>
              </div>
              <div class="form-check mr-2 mt-2 sm:mt-0">
                <input v-model="user.gender" class="form-check-input" type="radio" name="horizontal_radio_button"
                  value="Male" />
                <label class="form-check-label" for="male">Male</label>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <label class="form-label">State</label>
            <select class="form-control" placeholder="Profession" v-model="user.state">
              <option value="">Alcaldía</option>
              <option value="Cuauhtémoc">Cuauhtémoc</option>
              <option value="VenustianoCarranza">Venustiano Carranza</option>
              <option value="Miguel Hidalgo">Miguel Hidalgo</option>
            </select>
          </div>
          <div class="mt-3">
            <label class="form-label">City</label>
            <select class="form-control" v-model="user.city">
              <option disabled value="">City</option>
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

          <div class="text-right mt-5">
            <button type="button" class="btn btn-outline-secondary w-24 mr-1">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary w-24">Save</button>
          </div>
        </div>
      </form>
      <!-- END: Form Layout -->
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useUsersStore } from "../../stores/leader/users";
const { createUser } = useUsersStore();

const user = reactive({
  firstname: "",
  lastname: "",
  mobilephone: "",
  homephone: "",
  officephone: "",
  extension: "",
  profession: "",
  email: "",
  rfc: "",
  curp: "",
  servicepriority: "",
  prospectingorigin: "",
  prospectingmedium: "",
  gender: "",
  state: "",
  age: "",
  city: "",
  user_id: "",
});

const addProspect = async () => {
  await createUser(user);
}




















</script>
