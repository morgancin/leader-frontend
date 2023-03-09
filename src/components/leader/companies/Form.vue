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
  <div class="col-span-12 intro-y lg:col-span-6">
    
    <form class="validate-form" @submit.prevent="submitForm">
      <div class="p-5 intro-y box">
    
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
            <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
              <ChevronDownIcon class="w-4 h-4 mr-2" /> Datos de compañía
            </div>
            <div class="mt-5">  
                <!-- BEGIN: Form Layout -->
                <!-- <form @submit.prevent="submitForm()" autocomplete="on"> -->
              
                
                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
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
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          Nombre de la compañía, espacio para caracteres alfanúmericos.
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <input 
                        id="validation-form-1" 
                        v-model.trim="v$.name.$model" 
                        v-model="company.name" 
                        type="text" 
                        name="name"
                        class="form-control" 
                        :class="{ 'border-danger': v$.name.$error }" 
                        :placeholder="$t('add_companies.name')" />
                      <div class="text-right form-help">
                        Deben ser al menos 2 caracteres.
                      </div>
                      <template v-if="v$.name.$error">
                        <div 
                          v-for="(error, index) in v$.name.$errors" 
                          :key="index" 
                          class="mt-2 text-danger">
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </div>

                  
                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.zip_code') }}</div>                          
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          Código postal de la compañía.
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <input 
                      v-model.number="company.postal_code" 
                      :placeholder="$t('add_companies.zip_code')"
                      type="text" class="w-full form-control"/>
                      <div class="text-right form-help">
                          Deben ser 5 caracteres.
                      </div>
                    </div>
                  </div>

                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.state') }}</div>                          
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          Estado de la compañía.
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 w-full mt-3 xl:mt-0">
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

                 <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_companies.city') }}</div>                          
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          Ciudad de la compañía.
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <TomSelect  class="form-control" :placeholder="$t('add_companies.city')" v-model.trim="select" v-model="company.city">
                        <option value="1">{{ $t('add_companies.select_option') }}</option>
                        <option value="">{{ $t('add_companies.city') }}</option>
                        <option value="Cuauhtémoc">Cuauhtémoc</option>
                        <option value="VenustianoCarranza">Venustiano Carranza</option>
                        <option value="Miguel Hidalgo">Miguel Hidalgo</option>
                      </TomSelect>
                    </div>
                  </div>              
                
              </div>
              <!-- END: Form Layout -->
          </div>
      </div>

      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <button
          type="button"
          class="w-full py-3 btn border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
        >
          {{ $t('add_companies.btn_cancel') }}
        </button>
        <button type="submit" class="w-full py-3 btn btn-primary md:w-52">
          {{ $t('add_companies.btn_save') }}
        </button>
      </div>

    </form>

    <!--<div>
      <p>Errors:</p>
      <span v-for="error in v$.$errors" :key="error.$uid">
        {{ error.$property }} - {{ error.$message }}
      </span>
    </div>-->
    <!-- BEGIN: Success Notification Content -->
    <div
      id="success-notification-content"
      class="flex hidden toastify-content">
      <CheckCircleIcon class="text-success" />
      <div class="ml-4 mr-4">
        <div class="font-medium">{{ $t('add_companies.registration_success') }}</div>
        <div class="mt-1 text-slate-500">
          {{ $t('add_companies.check_success') }}
        </div>
      </div>
    </div>
    <!-- END: Success Notification Content -->
    <!-- BEGIN: Failed Notification Content -->
    <div
      id="failed-notification-content"
      class="flex hidden toastify-content">
      <XCircleIcon class="text-danger" />
      <div class="ml-4 mr-4">
        <div class="font-medium">{{ $t('add_companies.registration_failed') }}</div>
        <div class="mt-1 text-slate-500">
          {{ $t('add_companies.check_failed') }}
        </div>
      </div>
    </div>
    <!-- END: Failed Notification Content -->

  </div>

</template>