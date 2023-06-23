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
    <div class="col-span-12 intro-y">

      <!-- BEGIN: Form Validation -->
      <PreviewComponent>
        <form id="formulario" @submit.prevent="submitCreate" class="validate-form" autocomplete="on">
          <div class="p-5 intro-y box">
            <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('teams.form.labels.title') }}
              </div>
              <div class="mt-5">
                <Preview>

                  <!-- BEGIN: Validation Form -->
                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('teams.form.labels.fields.name') }}</div>
                          <div
                            class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              {{ $t('teams.form.labels.required') }}
                          </div>
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('teams.form.instructions.name') }}</div>
                      </div>
                    </div>
                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <input
                        type="text"
                        name="name"
                        class="form-control"
                        id="validation-form-1"
                        :placeholder="$t('teams.form.placeholders.name')"
                        v-model="team.name"
                        :class="{ 'border-danger': validate.name.$error }" />
                        <div class="text-right form-help">{{ $t('teams.form.instructions.validation.name') }}</div>
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
                          <div class="font-medium">{{ $t('teams.form.labels.fields.carousel') }}</div>
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          {{ $t('teams.form.instructions.carousel') }}
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
                        <label class="form-check-label" for="product-status-active">{{ $t('teams.form.labels.carousel') }}</label>
                      </div>
                    </div>
                  </div>

                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('teams.form.labels.fields.status') }}</div>
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('teams.form.instructions.status') }}</div>
                      </div>
                    </div>
                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <div class="form-check form-switch">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="product-status-active"
                          v-model="team.active" />
                          <label class="form-check-label" for="product-status-active">{{ $t('teams.form.labels.active') }}</label>
                      </div>
                    </div>
                  </div>
                </Preview>
              </div>
            </div>
          </div>

          <div class="p-5 mt-5 intro-y box">
            <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('teams.form.labels.complementary_information') }}
              </div>
              <div class="mt-5">

                <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('teams.form.labels.fields.users') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            {{ $t('teams.form.labels.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        {{ $t('teams.form.instructions.users') }}
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
                  </div>
                </div>
                                
                <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('teams.form.labels.fields.prospecting_source') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            {{ $t('teams.form.labels.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('teams.form.instructions.prospecting_source') }}</div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
            <button type="button" class="w-full py-3 mr-1 md:w-52 btn btn-outline-secondary">{{ $t('teams.buttons.cancel') }}</button>
            <button type="submit" class="w-full py-3 btn btn-primary md:w-52">{{ $t('teams.buttons.save') }}</button>
          </div>
        </form>

      </PreviewComponent>
      <!-- END: Form Validation -->
    </div>
  </div>
</template>