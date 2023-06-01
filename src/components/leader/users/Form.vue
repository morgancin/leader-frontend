<script>
  export default {
    name: "UserForm",
  }
</script>

<script setup>
  import { reactive, toRefs, ref, watch, computed, onMounted } from "vue";
  import { storeToRefs } from "pinia";
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
  //import Toastify from "toastify-js";
  //import dom from "@left4code/tw-starter/dist/js/dom";
  import { useVuelidate } from "@vuelidate/core";

  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  
  import vSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';

  import { useAccountsStore } from "@/stores/leader/accounts";
  import { useGetDataRoles } from '../../../composables/getData/useGetDataRoles';
  import { useGetDataPermissions } from '../../../composables/getData/useGetDataPermissions';

  import i18n from "../../../language/i18n";
  const { t } = i18n.global;
  
  const props = defineProps({
    user: {
      type: Object,
      required: true,
    },
  })
  
  const emit = defineEmits(["submit"]);

  const { fetchAccounts } = useAccountsStore();
  const { accounts: dataAccounts } = storeToRefs(useAccountsStore());
  
  const { fetchRoles, results_roles, roles_errors } = useGetDataRoles();
  const { fetchPermissions, results_permissions, permissions_errors } = useGetDataPermissions();

  const dataRoles = ref([]);
  const dataPermissions = ref([]);
  
  const containsUser = (value) => {
    return value.include("user")
  }
  
  ////////RULES
  const rules = {
      name: { required },
      accounts: { required },
      email: { required, email},
      password: { required, minLength: minLength(6)},
      password_confirmation: { required, minLength: minLength(6)}
  }
  
  const validate = useVuelidate(rules, props.user);
  
  const submitCreate = async () => {
    validate.value.$touch();
    
    if (validate.value.$invalid) {
      toast.error(t('messages.validation_error'), {
                      autoClose:1000,
                    });
    }
    
    const result = await validate.value.$validate();
    
    if(result) {
      emit('submit');
    }
  }

  onMounted(async() => {
    await fetchRoles();
    await fetchAccounts();
    await fetchPermissions();
    dataRoles.value = results_roles.value;
    dataPermissions.value = results_permissions.value;
  });
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
        <form id="formulario" @submit.prevent="submitCreate" class="validate-form" autocomplete="on">
          <div class="p-5 intro-y box">
            <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('forms.basic-info')}}
              </div>
              <div class="mt-5">
                <Preview>

                  <!-- BEGIN: Validation Form -->
                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('add_user.account') }}</div>
                          <div
                            class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              {{ $t('forms.required') }}
                          </div>
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          Cuentas a las que pertenece.
                        </div>
                      </div>
                    </div>
                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <v-select
                        multiple
                        label="name"
                        class="w-full form-control"
                        :options="dataAccounts"
                        :reduce="name => name.id"
                        v-model="user.accounts"
                        :class="{ 'border-danger': validate.accounts.$error }">
                      </v-select>
                      
                      <template v-if="validate.accounts.$error">
                        <div
                          v-for="(error, index) in validate.accounts.$errors"
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
                          <div class="font-medium">{{ $t('add_user.name') }}</div>
                          <div
                            class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              {{ $t('forms.required') }}
                          </div>
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          Nombre del usuario, espacio para caracteres alfanúmericos, no incluir apellidos.
                        </div>
                      </div>
                    </div>
                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <input
                        type="text"
                        name="name"
                        class="form-control"
                        id="validation-form-1"
                        :placeholder="$t('add_user.name')"
                        v-model="user.name"
                        :class="{ 'border-danger': validate.name.$error }" />
                        <div class="text-right form-help">
                            Deben ser al menos 2 caracteres.
                        </div>
                        <template v-if="validate.name.$error">
                          <div
                            v-for="(error, index) in validate.name.$errors"
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
                            <div class="font-medium">{{ $t('add_user.email') }}</div>
                            <div
                              class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              {{ $t('forms.required') }}
                            </div>
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Email del usuario, escribir en formato de correo, por ejemplo: usuario@dominio.com
                          </div>
                        </div>
                      </div>

                      <div class="flex-1 w-full mt-3 xl:mt-0">
                        <input
                          id="validation-form-2"
                          v-model.trim="validate.email.$model"
                          v-model="user.email"
                          type="email"
                          name="email"
                          class="form-control"
                          :class="{ 'border-danger': validate.email.$error }"
                          :placeholder="$t('add_user.email')"/>
                        <div class="text-right form-help">
                            En formato de correo electrónico.
                        </div>
                        <template v-if="validate.email.$error">
                          <div
                            v-for="(error, index) in validate.email.$errors"
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
                            <div class="font-medium">Status</div>
                              <div
                                  class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                    Required
                              </div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                If the status is active, your user can be searched for by
                                potential buyers.
                              </div>
                            </div>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                            <div class="form-check form-switch">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="product-status-active"
                                v-model="user.active" />                        
                              <label class="form-check-label" for="product-status-active">Active</label>
                        </div>
                      </div>
                    </div>

                    <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                      <div class="form-label xl:w-72 xl:!mr-10">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">{{ $t('add_user.password') }}</div>
                            <div
                              class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                {{ $t('forms.required') }}
                            </div>
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Contraseña para el usuario, con la que ingresará al sistema.
                          </div>
                        </div>
                      </div>

                      <div class="flex-1 w-full mt-3 xl:mt-0">
                        <input
                          id="validation-form-3"
                          v-model.trim="validate.password.$model"
                          v-model="user.password"
                          type="password"
                          name="password"
                          class="form-control"
                          :class="{ 'border-danger': validate.password.$error }"
                          :placeholder="$t('add_user.password')"/>
                        <div class="text-right form-help">
                            Deben ser al menos 6 caracteres.
                        </div>
                        <template v-if="validate.password.$error">
                          <div
                            v-for="(error, index) in validate.password.$errors"
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
                            <div class="font-medium">{{ $t('add_user.password_confirmation') }}</div>
                            <div
                              class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                {{ $t('forms.required') }}
                            </div>
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Confirmación de contraseña para el usuario, debe coincidir con la contraseña de arriba.
                          </div>
                        </div>
                      </div>

                      <div class="flex-1 w-full mt-3 xl:mt-0">
                        <input
                          id="validation-form-4"
                          v-model.trim="validate.password_confirmation.$model"
                          v-model="user.password_confirmation"
                          type="password"
                          name="password"
                          class="form-control"
                          :class="{ 'border-danger': validate.password_confirmation.$error }"
                          :placeholder="$t('add_user.password_confirmation')"/>
                        <div class="text-right form-help">
                            Deben ser al menos 6 caracteres.
                        </div>
                        <template v-if="validate.password_confirmation.$error">
                          <div
                            v-for="(error, index) in validate.password_confirmation.$errors"
                            :key="index"
                            class="mt-2 text-danger">
                            {{ error.$message }}
                          </div>
                        </template>
                      </div>
                    </div>
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

          <div class="p-5 mt-5 intro-y box">
            <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('forms.complementary-info')}}
              </div>
              <div class="mt-5">

                <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('forms.roles') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                        >
                          {{ $t('forms.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        Rol que funge el usuario en el sistema.
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <v-select
                      multiple
                      label="name"
                      class="form-control" 
                      :options="dataRoles" 
                      v-model="user.roles">
                    </v-select>
                    <div class="text-right form-help">
                      {{ $t('forms.select_options') }}
                    </div>                    
                  </div>
                </div> 


                <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('forms.permissions') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md"
                        >
                          {{ $t('forms.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        Permisos que tiene el usuario en el sistema.
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <v-select
                      multiple
                      label="name"
                      class="form-control" 
                      :options="dataPermissions" 
                      v-model="user.permissions">
                    </v-select>
                    <div class="text-right form-help">
                      {{ $t('forms.select_options') }}
                    </div>                    
                  </div>
                </div> 


              </div>
            </div>
          </div>

          <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
            <button
              type="button"
              class="w-full py-3 btn border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
            >
              {{ $t('add_user.btn_cancel') }}
            </button>
            <button type="submit" class="w-full py-3 btn btn-primary md:w-52" @click="update">
              {{ $t('add_user.btn_save') }}
            </button>
          </div>

        </form>

      </PreviewComponent>
      <!-- END: Form Validation -->
    </div>
  </div>
  
</template>