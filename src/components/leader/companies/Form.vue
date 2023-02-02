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
    <!-- BEGIN: Form Layout -->
      <!-- <form @submit.prevent="submitForm()" autocomplete="on"> -->
    <form class="validate-form" @submit.prevent="submitForm">
      <div class="intro-y box p-5 intro-y grid lg:grid-cols-4 sm:grid_cols-12 md:grid-cols-3 gap-3 mt-5">
        <div class="input-form">
          <label for="validation-form-1" class="form-label w-full flex flex-col sm:flex-row">
            {{ $t('add_companies.name') }}
            <!-- <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
              Required, at least 2 characters
            </span> -->
          </label>
          <input 
            id="validation-form-1" 
            v-model.trim="v$.name.$model" 
            v-model="company.name" 
            type="text" 
            name="name"
            class="form-control" 
            :class="{ 'border-danger': v$.name.$error }" 
            :placeholder="$t('add_companies.name')" />
          <template v-if="v$.name.$error">
            <div 
              v-for="(error, index) in v$.name.$errors" 
              :key="index" 
              class="text-danger mt-2">
              {{ error.$message }}
            </div>
          </template>
        </div>
        <div class="input-form">
          <label for="validation-form-2" class="form-label w-full flex flex-col sm:flex-row">
            {{ $t('add_companies.email') }}
            <!-- <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
              Required, at least 2 characters
            </span> -->
          </label>
          <input 
            id="validation-form-2" 
            v-model.trim="v$.email.$model" 
            v-model="company.email" 
            type="email" 
            name="email"
            class="form-control" 
            :class="{ 'border-danger': v$.email.$error }" 
            :placeholder="$t('add_companies.email')" />
          <template v-if="v$.email.$error">
            <div 
              v-for="(error, index) in v$.email.$errors" 
              :key="index" 
              class="text-danger mt-2">
              {{ error.$message }}
            </div>
          </template>
        </div>
        <div class="input-form">
          <label for="validation-form-3" class="form-label w-full flex flex-col sm:flex-row">
            {{ $t('add_companies.password') }}
            <!-- <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
              Required, at least 2 characters
            </span> -->
          </label>
          <input 
            id="validation-form-3" 
            v-model.trim="v$.password.$model" 
            v-model="company.password" 
            type="password"
            name="password"
            class="form-control" 
            :class="{ 'border-danger': v$.password.$error }" 
            :placeholder="$t('add_companies.password')" />
          <template v-if="v$.password.$error">
            <div 
              v-for="(error, index) in v$.password.$errors" 
              :key="index" 
              class="text-danger mt-2">
              {{ error.$message }}
            </div>
          </template>
        </div>
        <div class="input-form">
          <label for="validation-form-4" class="form-label w-full flex flex-col sm:flex-row">
            {{ $t('add_companies.password_confirmation') }}
            <!-- <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
              Required, at least 2 characters
            </span> -->
          </label>
          <input 
            id="validation-form-4" 
            v-model.trim="v$.password_confirmation.$model" 
            v-model="company.password_confirmation" 
            type="password"
            name="password_confirmation"
            class="form-control" 
            :class="{ 'border-danger': v$.password_confirmation.$error }" 
            :placeholder="$t('add_companies.password_confirmation')" />
          <template v-if="v$.password_confirmation.$error">
            <div 
              v-for="(error, index) in v$.password_confirmation.$errors" 
              :key="index" 
              class="text-danger mt-2">
              {{ error.$message }}
            </div>
          </template>
        </div>
        <div class="mt-3">
            <label class="form-label">{{ $t('add_companies.zip_code') }}</label>
            <input 
            v-model.number="company.postal_code" 
            :placeholder="$t('add_companies.zip_code')"
            type="text" class="form-control w-full"/>
          </div>
      <!--  <div class="input-form">
          <label for="validation-form-5" class="form-label w-full flex flex-col sm:flex-row">
            {{ $t('add_companies.zip_code') }}
             <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
              Required, at least 2 characters
            </span> 
          </label>
          <input 
            id="validation-form-5" 
            v-model.trim="v$.zip_code.$model" 
            v-model="company.zip_code" 
            type="number" 
            name="zip_code"
            class="form-control" 
            :class="{ 'border-danger': v$.zip_code.$error }" 
            :placeholder="$t('add_companies.zip_code')" />
          <template v-if="v$.zip_code.$error">
            <div 
              v-for="(error, index) in v$.zip_code.$errors" 
              :key="index" 
              class="text-danger mt-2">
              {{ error.$message }}
            </div>
          </template>
        </div>-->
        <div class="input-form">
          <label class="form-label w-full flex flex-col sm:flex-row">{{ $t('add_companies.state') }}</label>
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
        <div class="mt-3">
          <label class="form-label">{{ $t('add_companies.city') }}</label>
          <TomSelect  class="form-control" :placeholder="$t('add_companies.city')" v-model.trim="select" v-model="company.city">
            <option value="">{{ $t('add_companies.city') }}</option>
            <option value="Cuauhtémoc">Cuauhtémoc</option>
            <option value="VenustianoCarranza">Venustiano Carranza</option>
            <option value="Miguel Hidalgo">Miguel Hidalgo</option>
          </TomSelect >
        </div>
        <div class="text-center flex mt-10">
          <button type="button" class="btn btn-outline-secondary w-24 mr-1">{{ $t('add_companies.btn_cancel') }}</button>
          <button type="submit" class="btn btn-primary w-24">{{ $t('add_companies.btn_save') }}</button>
        </div>
      </div>
    </form>
      <!-- END: Form Layout -->

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