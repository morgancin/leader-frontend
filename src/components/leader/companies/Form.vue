<script>
    export default {
        name: "CompanyForm",
    }
</script>

<script setup>
  import { ref, provide, toRefs } from "vue"
  import {
    required,
    minLength,
    maxLength,
    email,
    numeric
    // sameAs
    // url,
    // integer,
  } from "@vuelidate/validators";
  import { useVuelidate } from "@vuelidate/core";
  import Toastify from "toastify-js";
  import dom from "@left4code/tw-starter/dist/js/dom";

  
  const props = defineProps({
        company: {
            type: Object,
            required: true,
        },
        // textButton: {
        //     type: String,
        //     default: "Save",
        // },
    })

    const emit = defineEmits(["submit"]);

    const rules = {
    name: {
      required,
      // minLength: minLength(2),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    password_confirmation: {
      required,
      minLength: minLength(6),
      // sameAs: sameAs(formData.password)
    },
    // zip_code: {
    //   required,
    //   numeric,
    //   minLength: minLength(6),
    //   maxLength: maxLength(6),
    // },
    city: {
      required
    },    
    // state: {
    //   required
    // },
    
    // postal_code: {
    //   required
    // },
  };

  const v$ = useVuelidate(rules, toRefs(props.company));

  const submitForm = async () => {

    v$.value.$touch();
    if (v$.value.$invalid) {
        Toastify({
          node: dom("#failed-notification-content")
            .clone()
            .removeClass("hidden")[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
      } else {
        Toastify({
          node: dom("#success-notification-content")
            .clone()
            .removeClass("hidden")[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
      }

    const result = await v$.value.$validate()
    if(result) {
        emit('submit')
    } 
    } 
</script>

<template>
  <div class="intro-y col-span-12 lg:col-span-6">
    
    <div class="intro-y box p-5">
  
      <div class="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
          <div class="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
            <ChevronDownIcon class="w-4 h-4 mr-2" /> Datos de compañía
          </div>
          <div class="mt-5">  
              <!-- BEGIN: Form Layout -->
              <!-- <form @submit.prevent="submitForm()" autocomplete="on"> -->
              <form class="validate-form" @submit.prevent="submitForm">
                
                  <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.name') }}</div>
                          <div
                            class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                          >
                            Requerido
                          </div>
                        </div>
                        <div class="leading-relaxed text-slate-500 text-xs mt-3">
                          Nombre de la compañía, espacio para caracteres alfanúmericos.
                        </div>
                      </div>
                    </div>

                    <div class="w-full mt-3 xl:mt-0 flex-1">
                      <input 
                        id="validation-form-1" 
                        v-model.trim="v$.name.$model" 
                        v-model="company.name" 
                        type="text" 
                        name="name"
                        class="form-control" 
                        :class="{ 'border-danger': v$.name.$error }" 
                        :placeholder="$t('add_companies.name')" />
                      <div class="form-help text-right">
                        Deben ser al menos 2 caracteres.
                      </div>
                      <template v-if="v$.name.$error">
                        <div 
                          v-for="(error, index) in v$.name.$errors" 
                          :key="index" 
                          class="text-danger mt-2">
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </div>

                  <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.email') }}</div>
                          <div
                            class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                          >
                            Requerido
                          </div>
                        </div>
                        <div class="leading-relaxed text-slate-500 text-xs mt-3">
                          Email de la compañía, escribir en formato de correo, por ejemplo: usuario@dominio.com
                        </div>
                      </div>
                    </div>

                    <div class="w-full mt-3 xl:mt-0 flex-1">
                      <input 
                        id="validation-form-2" 
                        v-model.trim="v$.email.$model" 
                        v-model="company.email" 
                        type="email" 
                        name="email"
                        class="form-control" 
                        :class="{ 'border-danger': v$.email.$error }" 
                        :placeholder="$t('add_companies.email')" />
                      <div class="form-help text-right">
                        En formato de correo electrónico.
                      </div>
                      <template v-if="v$.email.$error">
                        <div 
                          v-for="(error, index) in v$.email.$errors" 
                          :key="index" 
                          class="text-danger mt-2">
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </div>


                  <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.password') }}</div>
                          <div
                            class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                          >
                            Requerido
                          </div>
                        </div>
                        <div class="leading-relaxed text-slate-500 text-xs mt-3">
                          Contraseña para la compañía, con la que ingresará al sistema.
                        </div>
                      </div>
                    </div>

                    <div class="w-full mt-3 xl:mt-0 flex-1">
                      <input
                        id="validation-form-3"
                        v-model.trim="v$.password.$model"
                        v-model="company.password"
                        type="password"
                        name="password"
                        class="form-control"
                        :class="{ 'border-danger': v$.password.$error }"
                        :placeholder="$t('add_companies.password')"/>
                      <div class="form-help text-right">
                          Deben ser al menos 6 caracteres.
                      </div>
                      <template v-if="v$.password.$error">
                        <div
                          v-for="(error, index) in v$.password.$errors"
                          :key="index"
                          class="mt-2 text-danger">
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </div>


                  <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.password_confirmation') }}</div>
                          <div
                            class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                          >
                            Requerido
                          </div>
                        </div>
                        <div class="leading-relaxed text-slate-500 text-xs mt-3">
                          Confirmación de contraseña para la compañía, debe coincidir con la contraseña de arriba.
                        </div>
                      </div>
                    </div>

                    <div class="w-full mt-3 xl:mt-0 flex-1">
                      <input
                        id="validation-form-3"
                        v-model.trim="v$.password_confirmation.$model"
                        v-model="company.password_confirmation"
                        type="password"
                        name="password_confirmation"
                        class="form-control"
                        :class="{ 'border-danger': v$.password_confirmation.$error }"
                        :placeholder="$t('add_companies.password_confirmation')"/>
                      <div class="form-help text-right">
                          Deben ser al menos 6 caracteres.
                      </div>
                      <template v-if="v$.password_confirmation.$error">
                        <div
                          v-for="(error, index) in v$.password_confirmation.$errors"
                          :key="index"
                          class="mt-2 text-danger">
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </div>


                  

                  <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.zip_code') }}</div>                          
                        </div>
                        <div class="leading-relaxed text-slate-500 text-xs mt-3">
                          Código postal de la compañía.
                        </div>
                      </div>
                    </div>

                    <div class="w-full mt-3 xl:mt-0 flex-1">
                      <input 
                      v-model.number="company.postal_code" 
                      :placeholder="$t('add_companies.zip_code')"
                      type="text" class="form-control w-full"/>
                      <div class="form-help text-right">
                          Deben ser 5 caracteres.
                      </div>
                    </div>
                  </div>

                  <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.state') }}</div>                          
                        </div>
                        <div class="leading-relaxed text-slate-500 text-xs mt-3">
                          Estado de la compañía.
                        </div>
                      </div>
                    </div>

                    <div class="w-full mt-3 xl:mt-0 flex-1">
                      <TomSelect class="form-control" v-model.trim="select" v-model="company.state">
                        <option value="1">{{ $t('add_companies.select_option') }}</option>
                        <!-- <option disabled value="">{{ $t('add_companies.select_option') }}</option> -->
                        <option value="">{{ $t('add_companies.select_option') }}</option>
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
                      </TomSelect>
                    </div>
                  </div>

                 <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.city') }}</div>                          
                        </div>
                        <div class="leading-relaxed text-slate-500 text-xs mt-3">
                          Ciudad de la compañía.
                        </div>
                      </div>
                    </div>

                    <div class="w-full mt-3 xl:mt-0 flex-1">
                      <TomSelect  class="form-control" :placeholder="$t('add_companies.city')" v-model.trim="select" v-model="company.city">
                        <option value="1">{{ $t('add_companies.select_option') }}</option>
                        <option value="">{{ $t('add_companies.city') }}</option>
                        <option value="Cuauhtémoc">Cuauhtémoc</option>
                        <option value="VenustianoCarranza">Venustiano Carranza</option>
                        <option value="Miguel Hidalgo">Miguel Hidalgo</option>
                      </TomSelect>
                    </div>
                  </div>

                  <div class="flex justify-end flex-col md:flex-row gap-2 mt-5">
                    <button
                      type="button"
                      class="btn py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 w-full md:w-52"
                    >
                      Cancelar
                    </button>
                    <button type="submit" class="btn py-3 btn-primary w-full md:w-52">
                      {{ $t('add_companies.btn_save') }}
                    </button>
                  </div>

                
              </form>
              <!-- END: Form Layout -->
          </div>
      </div>

    </div>

    <div>
      <p>Errors:</p>
      <span v-for="error in v$.$errors" :key="error.$uid">
        {{ error.$property }} - {{ error.$message }}
      </span>
    </div>
    <!-- BEGIN: Success Notification Content -->
    <div
      id="success-notification-content"
      class="toastify-content hidden flex">
      <CheckCircleIcon class="text-success" />
      <div class="ml-4 mr-4">
        <div class="font-medium">{{ $t('add_companies.registration_success') }}</div>
        <div class="text-slate-500 mt-1">
          {{ $t('add_companies.check_success') }}
        </div>
      </div>
    </div>
    <!-- END: Success Notification Content -->
    <!-- BEGIN: Failed Notification Content -->
    <div
      id="failed-notification-content"
      class="toastify-content hidden flex">
      <XCircleIcon class="text-danger" />
      <div class="ml-4 mr-4">
        <div class="font-medium">{{ $t('add_companies.registration_failed') }}</div>
        <div class="text-slate-500 mt-1">
          {{ $t('add_companies.check_failed') }}
        </div>
      </div>
    </div>
    <!-- END: Failed Notification Content -->

  </div>

</template>