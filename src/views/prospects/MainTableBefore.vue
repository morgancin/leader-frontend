<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Add New Prospect</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <!-- BEGIN: Modal Toggle -->
      <div class="text-center">
        <a href="javascript:;" @click="headerFooterModalPreview = true" class="btn btn-primary shadow-md mr-2">Add
          New Prospect</a>
      </div>
      <!-- END: Modal Toggle -->
      <!-- BEGIN: Modal Content -->
      <Modal :show="headerFooterModalPreview" @hidden="headerFooterModalPreview = false">
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">
            Add Prospect
          </h2>
          <!-- <button class="btn btn-outline-secondary hidden sm:flex">
                  <FileIcon class="w-4 h-4 mr-2" /> Download Docs
              </button> -->
          <Dropdown class="sm:hidden">
            <DropdownToggle class="w-5 h-5 block" href="javascript:;">
              <MoreHorizontalIcon class="w-5 h-5 text-slate-500" />
            </DropdownToggle>
            <DropdownMenu class="w-40">
              <DropdownContent>
                <DropdownItem>
                  <FileIcon class="w-4 h-4 mr-2" />
                  Download Docs
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </ModalHeader>
        <ModalBody>
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
                <input v-model="lastname" type="text" class="form-control" placeholder="Last Name" />
              </div>
              <!-- Mobile Phone -->
              <div class="mt-3 ">
                <input v-model.number="mobilephone" type="number" class="form-control" placeholder="Mobile Phone *" required />
              </div>
              <!-- Home Phone -->
              <div class="mt-3 ">
                <input v-model.number="homephone" type="number" class="form-control" placeholder="Home Phone" />
              </div>
              <!-- Office Phone -->
              <div class="mt-3">
                <input v-model.number="officephone" type="number" class="form-control" placeholder="Office Phone" />
              </div>
              <!-- Extension -->
              <div class="mt-3">
                <input v-model.number="extension" type="number" class="form-control" placeholder="Extensión" />
              </div>
              <!-- email -->
              <div class="mt-3">
                <input v-model="email" type="email" class="form-control" placeholder="Email" />
              </div>
              <!-- Password -->
              <div class="mt-3">
                <input v-model="password" type="password" class="form-control" placeholder="Password" />
              </div>
              <!-- Password Confirmation -->
              <div class="mt-3">
                <input v-model="password_confirmation" type="password" class="form-control" placeholder="Password Confirmation" />
              </div>
              <!-- State -->
              <div class="mt-3">
                <select class="form-control" placeholder="Profession" v-model="state">
                  <option value="">Alcaldía</option>
                  <option value="Cuauhtémoc">Cuauhtémoc</option>
                  <option value="VenustianoCarranza">Venustiano Carranza</option>
                  <option value="Miguel Hidalgo">Miguel Hidalgo</option>
                </select>
              </div>
              <!-- Priority -->
              <div class="mt-3">
                <select class="form-control" placeholder="Service Priority" v-model="servicepriority">
                  <option disabled value="">Prospecting Medium</option>
                  <option value="Bajo">Bajo</option>
                  <option value="Medio">Medio</option>
                  <option value="Alto">Alto</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
              </div>
              <!-- Profession -->
              <div class="mt-3">
                <select class="form-control" placeholder="profession" v-model="profession">
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
              <!-- Date of Birth -->
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
                <input v-model.number="age" type="number" class="form-control" placeholder="Age" required minlength="1" maxlength="2" />
              </div>
              <!-- Gender -->
              <div class="mt-3">
                <label>Gender</label>
                <div class="flex flex-col sm:flex-row mt-2">
                  <div class="form-check mr-2">
                    <input v-model="gender" class="form-check-input" type="radio" name="horizontal_radio_button" value="Feminine" />
                    <label class="form-check-label" for="feminine">Feminine</label>
                  </div>
                  <div class="form-check mr-2 mt-2 sm:mt-0">
                    <input v-model="gender" class="form-check-input" type="radio" name="horizontal_radio_button" value="Male" />
                    <label class="form-check-label" for="male">Male</label>
                  </div>
                </div>
              </div>
              <!-- City -->
              <div class="mt-3">
                <select class="form-control" v-model="city">
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
              <!-- CURP -->
              <div class="mt-3">
                <input v-model="curp" type="text" class="form-control" placeholder="CURP" />
              </div>
              <!-- RFC -->
              <div class="mt-3">
                <input v-model="rfc" type="text" class="form-control" placeholder="RFC" />
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
                <select class="form-control" placeholder="Priority" v-model="prospectingmedium">
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
              <button type="button" @click="headerFooterModalPreview = false" class="btn btn-outline-secondary w-20 mr-1">
                  Cancel
              </button>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <div></div>
        </ModalFooter>
      </Modal>
      <!-- END: Modal Content -->
    </div>
  </div>
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
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const servicepriority = ref('')
const state = ref('')
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

 
async function addProspect(){
console.log('click')
  const dataProspect = {
    name: name.value,
    firstname: firstname.value,
    lastname: lastname.value,
    mobilephone: mobilephone.value,
    homephone: homephone.value,
    officephone: officephone.value,
    extension: extension.value,
    profession: profession.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
    servicepriority: servicepriority.value,
    state: state.value,
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

// async function getProspects() {
  //   } 
  axiosClient.get('/users/client')
    .then(({data}) => {
      console.log(data)
      return data;
    })
</script>
