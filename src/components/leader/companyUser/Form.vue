<script>
export default {
    name: "CompanyUserForm",
}
</script>

<script setup>
  import { ref, provide, toRefs } from "vue"
  import {
    required,
    minLength,
    email,
    // sameAs
    // url,
    // integer,
  } from "@vuelidate/validators";
  import { useVuelidate } from "@vuelidate/core";
  import Toastify from "toastify-js";
  import dom from "@left4code/tw-starter/dist/js/dom";

  const props = defineProps({
    companyUser: {
        type: Object,
        required: true,
    }
  })

  const emit = defineEmits(["submit"])

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
    }
  };

  const v$ = useVuelidate(rules, toRefs(props.companyUser));

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
    if (result) {
        emit('submit')
    }
  }
</script>
  
<template>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 ">
      <!-- BEGIN: Form Validation -->
      <PreviewComponent class="intro-y box">
        <div class="p-5">
          <Preview>
            <!-- BEGIN: Validation Form -->
            <form class="validate-form" @submit.prevent="submitForm" autocomplete="on">
              <div class="input-form">
                <label 
                  for="validation-form-1" 
                  class="form-label w-full flex flex-col sm:flex-row">
                    {{ $t('add_company_user.name') }}
                  <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                    Required, at least 2 characters
                  </span>
                </label>
                <input 
                  id="validation-form-1" 
                  v-model.trim="v$.name.$model" 
                  v-model="companyUser.name"
                  type="text" 
                  name="name" 
                  class="form-control"
                  :class="{ 'border-danger': v$.name.$error }"
                  :placeholder="$t('add_company_user.name')" />
                <template v-if="v$.name.$error">
                  <div 
                    v-for="(error, index) in v$.name.$errors" 
                    :key="index"
                    class="text-danger mt-2">
                      {{ error.$message }}
                  </div>
                </template>
              </div>
              <div class="input-form mt-3">
                <label 
                  for="validation-form-2" 
                  class="form-label w-full flex flex-col sm:flex-row">
                    {{ $t('add_company_user.email') }}
                  <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                    Required, email address format
                  </span>
                </label>
                <input 
                  id="validation-form-2" 
                  v-model.trim="v$.email.$model" 
                  v-model="companyUser.email" 
                  type="email" 
                  name="email"
                  class="form-control" 
                  :class="{ 'border-danger': v$.email.$error }"
                  :placeholder="$t('add_company_user.email')" />
                <template v-if="v$.email.$error">
                  <div 
                    v-for="(error, index) in v$.email.$errors" 
                    :key="index" 
                    class="text-danger mt-2">
                      {{ error.$message }}
                  </div>
                </template>
              </div>
              <div class="input-form mt-3">
                <label 
                  for="validation-form-3" 
                  class="form-label w-full flex flex-col sm:flex-row">
                    {{ $t('add_company_user.password') }}
                  <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                    Required, at least 6 characters
                  </span>
                </label>
                <input 
                  id="validation-form-3" 
                  v-model.trim="v$.password.$model" 
                  v-model="companyUser.password"
                  type="password" 
                  name="password" 
                  class="form-control"
                  :class="{ 'border-danger': v$.password.$error }"
                  :placeholder="$t('add_company_user.password')" />
                <template v-if="v$.password.$error">
                  <div 
                    v-for="(error, index) in v$.password.$errors" 
                    :key="index"
                    class="text-danger mt-2">
                      {{ error.$message }}
                  </div>
                </template>
              </div>
              <div class="input-form mt-3">
                <label 
                  for="validation-form-4" 
                  class="form-label w-full flex flex-col sm:flex-row">
                    {{ $t('add_company_user.password_confirmation') }}
                  <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">
                    Required, at least 6 characters
                  </span>
                </label>
                <input 
                  id="validation-form-4" 
                  v-model.trim="v$.password_confirmation.$model"
                  v-model="companyUser.password_confirmation" 
                  type="password" 
                  name="password"
                  class="form-control" 
                  :class="{ 'border-danger': v$.password_confirmation.$error }"
                  :placeholder="$t('add_company_user.password_confirmation')" />
                <template v-if="v$.password_confirmation.$error">
                  <div v-for="(error, index) in v$.password_confirmation.$errors" 
                    :key="index"
                    class="text-danger mt-2">
                      {{ error.$message }}
                  </div>
                </template>
              </div>
              <button type="submit" class="btn btn-primary mt-5">
                {{ $t('add_company_user.btn_save') }}
              </button>
            </form>
            <!-- END: Validation Form -->
            <div>
                <p>Errors:</p>
                <span v-for="error in v$.$errors" :key="error.$uid">
                    {{ error.$property }} - {{ error.$message }}
                </span>
            </div>
            <!-- BEGIN: Success Notification Content -->
            <div id="success-notification-content" class="toastify-content hidden flex">
                <CheckCircleIcon class="text-success" />
                <div class="ml-4 mr-4">
                    <div class="font-medium">{{ $t('add_company_user.registration_success') }}</div>
                    <div class="text-slate-500 mt-1">
                        {{ $t('add_company_user.check_success') }}
                    </div>
                </div>
            </div>
            <!-- END: Success Notification Content -->
            <!-- BEGIN: Failed Notification Content -->
            <div id="failed-notification-content" class="toastify-content hidden flex">
                <XCircleIcon class="text-danger" />
                <div class="ml-4 mr-4">
                    <div class="font-medium">{{ $t('add_company_user.registration_failed') }}</div>
                    <div class="text-slate-500 mt-1">
                        {{ $t('add_company_user.check_failed') }}
                    </div>
                </div>
            </div>
            <!-- END: Failed Notification Content -->
          </Preview>
        </div>
      </PreviewComponent>
      <!-- END: Form Validation -->
    </div>
  </div>
</template>
