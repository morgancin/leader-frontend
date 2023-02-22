<script>
  export default {
    name: "UserForm",
  }
</script>

<script setup>
  import {
    email,
    required,
    minLength,
    // maxLength,
    // helpers,
    // sameAs
    // url,
    // integer,
  } from "@vuelidate/validators";
  import Toastify from "toastify-js";
  import { useVuelidate } from "@vuelidate/core";
  import dom from "@left4code/tw-starter/dist/js/dom";
  import { reactive, toRefs, ref, watch, computed, onMounted } from "vue";
  import vSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';
  import { useGetDataRoles } from '../../../composables/getData/useGetDataRoles';
  import { useGetDataPermissions } from '../../../composables/getData/useGetDataPermissions';  

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    },
  })
  
  const emit = defineEmits(["submit"]);

  const { fetchRoles, results_roles, roles_errors } = useGetDataRoles();
  const { fetchPermissions, results_permissions, permissions_errors } = useGetDataPermissions();
  const dataRoles = ref([]);
  const dataPermissions = ref([]);

  onMounted(async() => {
    await fetchRoles();
    dataRoles.value = results_roles.value;
  });

  onMounted(async() => {
    await fetchPermissions();
    dataPermissions.value = results_permissions.value;
  });

  const containsUser = (value) => {
    return value.include("user")
  }

  const rules = computed(() =>{
    return {
      
        name: {
          required,
          // minLength: minLength(2),
          // containsUser: helpers.withMessage('El campo está vacío', containsUser)
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
          // sameAs: sameAs(props.password)
        }
      
    }
  })

 

  // const rules = {
  //   name: {
  //     required,
  //     // minLength: minLength(2),
  //   },
  //   email: {
  //     required,
  //     email,
  //   },
  //   password: {
  //     required,
  //     minLength: minLength(6),
  //   },
  //   password_confirmation: {
  //     required,
  //     minLength: minLength(6),
  //     sameAs: sameAs(props.password)
  //   }
  // };

  const v$ = useVuelidate(rules, toRefs(props.user));
  
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

//   function update() {
//  alert('click');
// }

// onMounted(() => window.addEventListener('mousemove', update))

</script>

<style>
  .vs__selected-options{flex-wrap:wrap!important}
  .vs__dropdown-option--disabled,.vs__dropdown-option--selected{display: none;}
</style>
  
<template>

  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="col-span-12 intro-y ">

      <!-- BEGIN: Form Validation -->
      <PreviewComponent>
        
        <form id="formulario" class="validate-form" @submit.prevent="submitForm">
          
          <div class="intro-y box p-5">
            <div class="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div class="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('forms.basic-info')}}
              </div>
              <div class="mt-5">
                <Preview>
                  <!-- BEGIN: Validation Form -->
                  
                    <!-- <form class="validate-form" @submit.prevent="save"> -->
                    <!-- <form @submit.prevent="$emit('submit')" autocomplete="on"> -->

                    <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div class="form-label xl:w-72 xl:!mr-10">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">{{ $t('add_user.name') }}</div>
                            <div
                              class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                            >
                              Requerido
                            </div>
                          </div>
                          <div class="leading-relaxed text-slate-500 text-xs mt-3">
                            Nombre del usuario, espacio para caracteres alfanúmericos, no incluir apellidos.
                          </div>
                        </div>
                      </div>

                      <div class="w-full mt-3 xl:mt-0 flex-1">                    
                        <input
                          id="validation-form-1"
                          v-model.trim="v$.name.$model"
                          v-model="user.name"
                          type="text"
                          name="name"
                          class="form-control"
                          :class="{ 'border-danger': v$.name.$error }"
                          :placeholder="$t('add_user.name')"/> 
                        <div class="form-help text-right">
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

                    <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div class="form-label xl:w-72 xl:!mr-10">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">{{ $t('add_user.email') }}</div>
                            <div
                              class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                            >
                              Requerido
                            </div>
                          </div>
                          <div class="leading-relaxed text-slate-500 text-xs mt-3">
                            Email del usuario, escribir en formato de correo, por ejemplo: usuario@dominio.com
                          </div>
                        </div>
                      </div>

                      <div class="w-full mt-3 xl:mt-0 flex-1">
                        <input
                          id="validation-form-2"
                          v-model.trim="v$.email.$model"
                          v-model="user.email"
                          type="email"
                          name="email"
                          class="form-control"
                          :class="{ 'border-danger': v$.email.$error }"
                          :placeholder="$t('add_user.email')"/>
                        <div class="form-help text-right">
                            En formato de correo electrónico.
                        </div>
                        <template v-if="v$.email.$error">
                          <div
                            v-for="(error, index) in v$.email.$errors"
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
                            <div class="font-medium">{{ $t('add_user.password') }}</div>
                            <div
                              class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                            >
                              Requerido
                            </div>
                          </div>
                          <div class="leading-relaxed text-slate-500 text-xs mt-3">
                            Contraseña para el usuario, con la que ingresará al sistema.
                          </div>
                        </div>
                      </div>

                      <div class="w-full mt-3 xl:mt-0 flex-1">
                        <input
                          id="validation-form-3"
                          v-model.trim="v$.password.$model"
                          v-model="user.password"
                          type="password"
                          name="password"
                          class="form-control"
                          :class="{ 'border-danger': v$.password.$error }"
                          :placeholder="$t('add_user.password')"/>
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
                            <div class="font-medium">{{ $t('add_user.password_confirmation') }}</div>
                            <div
                              class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                            >
                              Requerido
                            </div>
                          </div>
                          <div class="leading-relaxed text-slate-500 text-xs mt-3">
                            Confirmación de contraseña para el usuario, debe coincidir con la contraseña de arriba.
                          </div>
                        </div>
                      </div>

                      <div class="w-full mt-3 xl:mt-0 flex-1">
                        <input
                          id="validation-form-4"
                          v-model.trim="v$.password_confirmation.$model"
                          v-model="user.password_confirmation"
                          type="password"
                          name="password"
                          class="form-control"
                          :class="{ 'border-danger': v$.password_confirmation.$error }"
                          :placeholder="$t('add_user.password_confirmation')"/>
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
                    <!--<button type="submit" class="mt-5 btn btn-primary" @click="update">
                      {{ $t('add_user.btn_save') }}
                    </button>-->

                    

                 
                  <!--<div class="mt-5">
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
                      <div class="font-medium">{{ $t('add_user.registration_success') }}</div>
                      <div class="mt-1 text-slate-500">
                        {{ $t('add_user.check_success') }}
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
                      <div class="font-medium">{{ $t('add_user.registration_failed') }}</div>
                      <div class="mt-1 text-slate-500">
                        {{ $t('add_user.check_failed') }}
                      </div>
                    </div>
                  </div>
                  <!-- END: Failed Notification Content -->
                </Preview>
              </div>
            </div>
          </div>

          <div class="intro-y box p-5 mt-5">
            <div class="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div class="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('forms.complementary-info')}}
              </div>
              <div class="mt-5">

                <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('forms.roles') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                        >
                          Requerido
                        </div>
                      </div>
                      <div class="leading-relaxed text-slate-500 text-xs mt-3">
                        Rol que funge el usuario en el sistema.
                      </div>
                    </div>
                  </div>
                  <div class="w-full mt-3 xl:mt-0 flex-1">
                    <v-select
                      multiple
                      label="name"
                      class="form-control" 
                      :options="dataRoles" 
                      v-model="user.roles">
                    </v-select>
                    <div class="form-help text-right">
                      {{ $t('forms.select_options') }}
                    </div>                    
                  </div>
                </div> 


                <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('forms.permissions') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                        >
                          Requerido
                        </div>
                      </div>
                      <div class="leading-relaxed text-slate-500 text-xs mt-3">
                        Permisos que tiene el usuario en el sistema.
                      </div>
                    </div>
                  </div>
                  <div class="w-full mt-3 xl:mt-0 flex-1">
                    <v-select
                      multiple
                      label="name"
                      class="form-control" 
                      :options="dataPermissions" 
                      v-model="user.permissions">
                    </v-select>
                    <div class="form-help text-right">
                      {{ $t('forms.select_options') }}
                    </div>                    
                  </div>
                </div> 


              </div>
            </div>
          </div>

          <div class="flex justify-end flex-col md:flex-row gap-2 mt-5">
            <button
              type="button"
              class="btn py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 w-full md:w-52"
            >
              Cancelar
            </button>
            <button type="submit" class="btn py-3 btn-primary w-full md:w-52" @click="update">
              {{ $t('add_user.btn_save') }}
            </button>
          </div>

        </form>

      </PreviewComponent>
      <!-- END: Form Validation -->
    </div>
  </div>
  
</template>