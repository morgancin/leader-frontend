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
                <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('users.form.labels.title') }}
              </div>
              <div class="mt-5">
                <Preview>

                  <!-- BEGIN: Validation Form -->
                  <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                    <div class="form-label xl:w-72 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium">{{ $t('users.form.labels.fields.account') }}</div>
                          <div
                            class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              {{ $t('users.form.labels.required') }}
                          </div>
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">
                          {{ $t('users.form.instructions.account') }}
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
                          <div class="font-medium">{{ $t('users.form.labels.fields.name') }}</div>
                          <div
                            class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              {{ $t('users.form.labels.required') }}
                          </div>
                        </div>
                        <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('users.form.instructions.name') }}</div>
                      </div>
                    </div>
                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <input
                        type="text"
                        name="name"
                        class="form-control"
                        id="validation-form-1"
                        :placeholder="$t('users.form.placeholders.name')"
                        v-model="user.name"
                        :class="{ 'border-danger': validate.name.$error }" />
                        <div class="text-right form-help">{{ $t('users.form.instructions.validation.name') }}</div>
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
                            <div class="font-medium">{{ $t('users.form.labels.fields.email') }}</div>
                            <div
                              class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                {{ $t('users.form.labels.required') }}
                            </div>
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('users.form.instructions.email') }}</div>
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
                          :placeholder="$t('users.form.placeholders.email')"/>
                        <div class="text-right form-help">{{ $t('users.form.instructions.validation.email') }}</div>
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
                            <div class="font-medium">{{ $t('users.form.labels.fields.status') }}</div>
                              <div
                                  class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                    {{ $t('users.form.labels.required') }}
                              </div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('users.form.instructions.status') }}</div>
                            </div>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                            <div class="form-check form-switch">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="product-status-active"
                                v-model="user.active" />                        
                              <label class="form-check-label" for="product-status-active">{{ $t('users.form.labels.active') }}</label>
                        </div>
                      </div>
                    </div>

                    <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                      <div class="form-label xl:w-72 xl:!mr-10">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">{{ $t('users.form.labels.fields.password') }}</div>
                            <div
                              class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                {{ $t('users.form.labels.required') }}
                            </div>
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">{{ $t('users.form.instructions.password') }}</div>
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
                          :placeholder="$t('users.form.placeholders.password')"/>
                        <div class="text-right form-help">
                          {{ $t('users.form.instructions.validation.password') }}
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
                            <div class="font-medium">{{ $t('users.form.labels.fields.password_confirmation') }}</div>
                            <div
                              class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                {{ $t('forms.required') }}
                            </div>
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            {{ $t('users.form.instructions.password_confirmation') }}
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
                          :placeholder="$t('users.form.placeholders.password_confirmation')"/>
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
                </Preview>
              </div>
            </div>
          </div>

          <div class="p-5 mt-5 intro-y box">
            <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('users.form.labels.complementary_information')}}
              </div>
              <div class="mt-5">

                <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('users.form.labels.fields.roles') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            {{ $t('users.form.labels.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        {{ $t('users.form.instructions.roles') }}
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
                  </div>
                </div>
                
                <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('users.form.labels.fields.permissions') }}</div>
                        <div
                          class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            {{ $t('users.form.labels.required') }}
                        </div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        {{ $t('users.form.instructions.permissions') }}
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
            <button type="button" class="w-full py-3 btn border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52">
                {{ $t('users.buttons.cancel') }}
            </button>
            <button type="submit" class="w-full py-3 btn btn-primary md:w-52" @click="update">
              {{ $t('users.buttons.save') }}
            </button>
          </div>
        </form>
        
      </PreviewComponent>
      <!-- END: Form Validation -->
    </div>
  </div>
  
</template>