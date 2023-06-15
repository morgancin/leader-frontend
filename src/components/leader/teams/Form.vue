<script>
  export default {
    name: "TeamForm",
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

  import { useUsersStore } from "@/stores/leader/users";
  //import { useProspectingSourcesStore } from "@/stores/leader/prospecting-sources";
  import { useGetDataProspectingSources } from '../../../composables/getData/useGetDataProspectingSources';

  import i18n from "../../../language/i18n";
  const { t } = i18n.global;
  
  const props = defineProps({
    team: {
      type: Object,
      required: true,
    },
  })
  
  const emit = defineEmits(["submit"]);

  const { fetchUsers } = useUsersStore();

  const { users: data_users } = storeToRefs(useUsersStore());
  const { fetchProspectingSources } = useGetDataProspectingSources();
  
  const data_prospecting_sources = ref([]);
  
  ////////RULES
  const rules = {
      name: { required }
  }
  
  const validate = useVuelidate(rules, props.team);
  
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
    await fetchUsers();

    data_prospecting_sources.value = await fetchProspectingSources();
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
                      <input
                        type="text"
                        name="name"
                        class="form-control"
                        id="validation-form-1"
                        :placeholder="$t('add_user.name')"
                        v-model="team.name"
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
                          <div class="font-medium">Carousel</div>
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          If the status is carousel, your team can be searched for by potential buyers.
                        </div>
                      </div>
                    </div>
                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <div class="form-check form-switch">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="product-status-active"
                          v-model="team.is_carousel" />                        
                        <label class="form-check-label" for="product-status-active">carousel</label>
                      </div>
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
                              If the status is active, your team can be searched for by
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
                          v-model="team.active" />
                          <label class="form-check-label" for="product-status-active">Active</label>
                      </div>
                    </div>
                  </div>

                  <!--  
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
                          v-model="team.email"
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
                                If the status is active, your team can be searched for by
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
                                v-model="team.active" />                        
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
                          v-model="team.password"
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
                          v-model="team.password_confirmation"
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
                    -->
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
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            {{ $t('forms.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        Usuarios que conforman al equipo.
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <v-select
                      multiple
                      label="name"
                      class="form-control" 
                      :options="data_users" 
                      v-model="team.users">
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
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
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
                      :options="data_prospecting_sources" 
                      v-model="team.prospecting_sources">
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
              class="w-full py-3 btn border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52">
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