<script>
    export default {
        name: "CompanyForm",
    }
</script>

<script setup>
  import { ref, provide } from "vue"
    defineProps({
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

    const submitForm = async () => {
        emit('submit')
    }

    // Success notification
    const successNotification = ref();
      provide("bind[successNotification]", (el) => {
    // Binding
      successNotification.value = el;
    });
    const successNotificationToggle = () => {
    // Show notification
      successNotification.value.showToast();
    };
</script>

<template>
  <div class="intro-y col-span-12 lg:col-span-6">
    <!-- BEGIN: Form Layout -->
      <form @submit.prevent="submitForm()" autocomplete="on">
        <div class="intro-y box p-5 intro-y grid lg:grid-cols-4 sm:grid_cols-12 md:grid-cols-3 gap-3 mt-5">
          <div class="mt-3">
            <label class="form-label">{{ $t('add_companies.name') }}</label>
            <input 
              v-model="company.name"
              :placeholder="$t('add_companies.name')"
              type="text" 
              class="form-control w-full"/>
          </div>
          <div class="mt-3">
            <label class="form-label">{{ $t('add_companies.email') }}</label>
            <input 
              v-model="company.email" 
              :placeholder="$t('add_companies.email')"
              type="text" 
              class="form-control w-full"/>
          </div>
          <div class="mt-3">
            <label class="form-label">{{ $t('add_companies.password') }}</label>
            <input 
              v-model="company.password" 
              :placeholder="$t('add_companies.password')"
              type="password" 
              class="form-control w-full"/>
          </div>
          <div class="mt-3">
            <label class="form-label">{{ $t('add_companies.password_confirmation') }}</label>
            <input 
              v-model="company.password_confirmation" 
              :placeholder="$t('add_companies.password_confirmation')"
              type="password" 
              class="form-control w-full"/>
          </div>
          <div class="mt-3">
            <label class="form-label">{{ $t('add_companies.zip_code') }}</label>
            <input 
            v-model.number="company.postal_code" 
            :placeholder="$t('add_companies.zip_code')"
            type="text" class="form-control w-full"/>
          </div>
          <div class="mt-3">
            <label class="form-label">{{ $t('add_companies.state') }}</label>
            <select class="form-control" v-model="company.state">
              <option disabled value="">{{ $t('add_companies.state') }}</option>
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
            </select>
          </div>
          <div class="mt-3">
            <label class="form-label">{{ $t('add_companies.city') }}</label>
            <select class="form-control" placeholder="Profession" v-model="company.city">
              <option value="">{{ $t('add_companies.city') }}</option>
              <option value="Cuauhtémoc">Cuauhtémoc</option>
              <option value="VenustianoCarranza">Venustiano Carranza</option>
              <option value="Miguel Hidalgo">Miguel Hidalgo</option>
            </select>
          </div>
          <div class="text-center flex mt-10">
            <button type="button" class="btn btn-outline-secondary w-24 mr-1">{{ $t('add_companies.btn_cancel') }}</button>
            <button type="submit" class="btn btn-primary w-24" @click="successNotificationToggle">{{ $t('add_companies.btn_save') }}</button>
          </div>
        </div>
      </form>
      <!-- END: Form Layout -->
      <!-- BEGIN: Notification Content -->
      <Notification refKey="successNotification" class="flex">
          <CheckCircleIcon class="text-success" />
          <div class="ml-4 mr-4">
              <div class="font-medium">{{ $t('add_companies.notification_save') }}</div>
              <div class="text-slate-500 mt-1">
                {{ $t('add_companies.notification_msg') }}
              </div>
          </div>
      </Notification>
      <!-- END: Notification Content -->
  </div>
</template>