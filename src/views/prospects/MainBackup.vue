<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Add New Prospect Title</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <!-- BEGIN: Modal Toggle -->
      <div class="text-center">
        <a href="javascript:;" @click="basicModalPreview = true" class="btn btn-primary">Add
          New Prospect Btn Modal</a>
      </div>
      <!-- END: Modal Toggle -->
      <!-- BEGIN: Modal Content -->
      <Modal :show="basicModalPreview" @hidden="basicModalPreview = false">
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">
            Add Prospect
          </h2>
          <!-- <button class="btn btn-outline-secondary hidden sm:flex">
                  <FileIcon class="w-4 h-4 mr-2" /> Download Docs
              </button> 
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
          </Dropdown>-->
        </ModalHeader>
        <ModalBody>
          <!-- Form add prospect -->
          <form @submit.prevent="addProspect" autocomplete="on">
            <div
              class="mt-5 grid auto-rows-auto grid-flow-dense gap-4 xl:grid-cols-2 lg:grid-cols-2  md:grid-cols-2  sm:grid-cols-1">
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
                <input v-model.number="mobilephone" type="number" class="form-control" placeholder="Mobile Phone *"
                  required />
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
                <input v-model="password_confirmation" type="password" class="form-control"
                  placeholder="Password Confirmation" />
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
                <input v-model.number="age" type="number" class="form-control" placeholder="Age" required minlength="1"
                  maxlength="2" />
              </div>
              <!-- Gender -->
              <div class="mt-3">
                <label>Gender</label>
                <div class="flex flex-col sm:flex-row mt-2">
                  <div class="form-check mr-2">
                    <input v-model="gender" class="form-check-input" type="radio" name="horizontal_radio_button"
                      value="Feminine" />
                    <label class="form-check-label" for="feminine">Feminine</label>
                  </div>
                  <div class="form-check mr-2 mt-2 sm:mt-0">
                    <input v-model="gender" class="form-check-input" type="radio" name="horizontal_radio_button"
                      value="Male" />
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
              <button type="button" @click="basicModalPreview  = false" class="btn btn-outline-secondary mt-5">
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
  <!-- <div class="overflow-x-auto mt-5">
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
  </div> -->

  <!-- 
******************************
Prueba
******************************
 -->

  <!-- <h2 class="intro-y text-lg font-medium mt-10">Data List Layout</h2> -->
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
      <!-- <button class="btn btn-primary shadow-md mr-2">Add New Product</button>
      <Dropdown>
        <DropdownToggle class="btn px-2 box">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
        </DropdownToggle>
        <DropdownMenu class="w-40">
          <DropdownContent>
            <DropdownItem>
              <PrinterIcon class="w-4 h-4 mr-2" /> Print
            </DropdownItem>
            <DropdownItem>
              <FileTextIcon class="w-4 h-4 mr-2" /> Export to Excel
            </DropdownItem>
            <DropdownItem>
              <FileTextIcon class="w-4 h-4 mr-2" /> Export to PDF
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown> 
      <div class="hidden md:block mx-auto text-slate-500">
        Showing 1 to 10 of 150 entries
      </div>
      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <div class="w-56 relative text-slate-500">
          <input
            type="text"
            class="form-control w-56 box pr-10"
            placeholder="Search..."/>
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
        </div>
      </div>-->
    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <table class="table table-report -mt-2">
        <thead>
          <tr>
            <!-- <th class="whitespace-nowrap">IMAGES</th> -->
            <th class="whitespace-nowrap">PRODUCT NAME</th>
            <th class="text-center whitespace-nowrap">STOCK</th>
            <th class="text-center whitespace-nowrap">STATUS</th>
            <th class="text-center whitespace-nowrap">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(faker, fakerKey) in $_.take($f(), 10)" :key="fakerKey" class="intro-x">
            <!-- <td class="w-40">
              <div class="flex">
                <div class="w-10 h-10 image-fit zoom-in">
                  <Tippy
                    tag="img"
                    alt="Midone Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="faker.images[0]"
                    :content="`Uploaded at ${faker.dates[0]}`"
                  />
                </div>
                <div class="w-10 h-10 image-fit zoom-in -ml-5">
                  <Tippy
                    tag="img"
                    alt="Midone Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="faker.images[1]"
                    :content="`Uploaded at ${faker.dates[1]}`"
                  />
                </div>
                <div class="w-10 h-10 image-fit zoom-in -ml-5">
                  <Tippy
                    tag="img"
                    alt="Midone Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="faker.images[2]"
                    :content="`Uploaded at ${faker.dates[2]}`"
                  />
                </div>
              </div>
            </td> -->
            <td>
              <a href="" class="font-medium whitespace-nowrap">
                {{ faker.products[0].name }}
              </a>
              <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                {{ faker.products[0].category }}
              </div>
            </td>
            <td class="text-center">{{ faker.stocks[0] }}</td>
            <td class="w-40">
              <div class="flex items-center justify-center" :class="{
                  'text-success': faker.trueFalse[0],
                  'text-danger': !faker.trueFalse[0],
                }">
                <CheckSquareIcon class="w-4 h-4 mr-2" />
                {{ faker.trueFalse[0] ? "Active" : "Inactive" }}
              </div>
            </td>
            <td class="table-report__action w-56">
              <div class="flex justify-evenly items-center">
                <!-- BEGIN: Modal Toggle -->
                <a class="flex items-center" href="javascript:;" @click="headerFooterModalPreview = true">
                  <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                </a>
                <!-- END: Modal Toggle -->
                <!-- BEGIN: Modal Toggle -->
                <a class="flex items-center text-danger" href="javascript:;" @click="deleteConfirmationModal = true">
                  <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                </a>
                <!-- END: Modal Toggle -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
      <nav class="w-full sm:w-auto sm:mr-auto">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronsLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">...</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">1</a>
          </li>
          <li class="page-item active">
            <a class="page-link" href="#">2</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">3</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">...</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronRightIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronsRightIcon class="w-4 h-4" />
            </a>
          </li>
        </ul>
      </nav>
      <select class="w-20 form-select box mt-3 sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
    <!-- END: Pagination -->
  </div>

  <!-- BEGIN: Modal Content -->
  <Modal :show="headerFooterModalPreview" @hidden="headerFooterModalPreview = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">
        Edit Prospect
      </h2>
      <!-- <button class="btn btn-outline-secondary hidden sm:flex">
            <FileIcon class="w-4 h-4 mr-2" /> Download Docs
        </button>
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
        </Dropdown> -->
    </ModalHeader>
    <ModalBody>
      <form @submit.prevent="editProspect" autocomplete="on">
        <div
          class="mt-5 grid auto-rows-auto grid-flow-dense gap-4 xl:grid-cols-2 lg:grid-cols-2  md:grid-cols-2  sm:grid-cols-1">
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
            <input v-model.number="mobilephone" type="number" class="form-control" placeholder="Mobile Phone *"
              required />
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
            <input v-model="password_confirmation" type="password" class="form-control"
              placeholder="Password Confirmation" />
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
            <input v-model.number="age" type="number" class="form-control" placeholder="Age" required minlength="1"
              maxlength="2" />
          </div>
          <!-- Gender -->
          <div class="mt-3">
            <label>Gender</label>
            <div class="flex flex-col sm:flex-row mt-2">
              <div class="form-check mr-2">
                <input v-model="gender" class="form-check-input" type="radio" name="horizontal_radio_button"
                  value="Feminine" />
                <label class="form-check-label" for="feminine">Feminine</label>
              </div>
              <div class="form-check mr-2 mt-2 sm:mt-0">
                <input v-model="gender" class="form-check-input" type="radio" name="horizontal_radio_button"
                  value="Male" />
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
          <button type="submit" class="btn btn-primary mt-5">Send</button>
          <button type="button" @click="headerFooterModalPreview  = false" class="btn btn-outline-secondary mt-5">
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

  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-slate-500 mt-2">
          Do you really want to delete these records? <br />This process cannot
          be undone.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="deleteConfirmationModal = false" class="btn btn-outline-secondary w-24 mr-1">
          Cancel
        </button>
        <button type="button" class="btn btn-danger w-24">Delete</button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->
</template>

<script setup>
import { ref } from "vue";
import axios from "axios"
import axiosClient from "../../axios";


const basicModalPreview = ref(false)
const deleteConfirmationModal = ref(false);
const successModalPreview = ref(false);
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
    .catch(function (error) {
    console.log(error);
  })
}

// async function getProspects() {
  //   } 
  axiosClient.get('/users/client')
    .then(({data}) => {
      console.log(data)
      return data;
    })
    .catch(function (error) {
    console.log(error);
  })
</script>
