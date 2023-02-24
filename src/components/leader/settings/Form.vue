<script>
  export default {
    name: "SettingForm",
  }
</script>

<script setup>
  import { reactive } from "vue";
  
  const props = defineProps({
    setting: {
      type: Object,
      required: true,
    },
  })
  
  const emit = defineEmits(["submit"]);

  const submitForm = async () => {
    emit('submit')
    /*
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
    */
  }
</script>
  
<template>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="col-span-12 intro-y">
      <!-- BEGIN: Form Validation -->
      <PreviewComponent class="intro-y box" >
        <div class="p-5">
          <Preview>
            <!-- BEGIN: Validation Form -->
            <form id="formulario" class="validate-form" @submit.prevent="submitForm">
              <!-- <form class="validate-form" @submit.prevent="save"> -->
              <!-- <form @submit.prevent="$emit('submit')" autocomplete="on"> -->

              <!--
              <div class="input-form">
                <label
                  for="validation-form-1"
                  class="flex flex-col w-full form-label sm:flex-row">
                  {{ $t('add_user.name') }}
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                    Required, at least 2 characters
                  </span>
                </label>

                <input
                  id="validation-form-1"
                  v-model.trim="v$.name.$model"
                  v-model="user.name"
                  type="text"
                  name="name"
                  class="form-control"
                  :class="{ 'border-danger': v$.name.$error }"
                  :placeholder="$t('add_user.name')"/> 
                <template v-if="v$.name.$error">
                  <div
                    v-for="(error, index) in v$.name.$errors"
                    :key="index"
                    class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
              </div>

              <div class="mt-3 input-form">
                <label
                  for="validation-form-2"
                  class="flex flex-col w-full form-label sm:flex-row">
                  {{ $t('add_user.email') }}
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                    Required, email address format
                  </span>
                </label>
                <input
                  id="validation-form-2"
                  v-model.trim="v$.email.$model"
                  v-model="user.email"
                  type="email"
                  name="email"
                  class="form-control"
                  :class="{ 'border-danger': v$.email.$error }"
                  :placeholder="$t('add_user.email')"/>
                <template v-if="v$.email.$error">
                  <div
                    v-for="(error, index) in v$.email.$errors"
                    :key="index"
                    class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
              </div>

              <div class="mt-3 input-form">
                <label
                  for="validation-form-3"
                  class="flex flex-col w-full form-label sm:flex-row">
                  {{ $t('add_user.password') }}
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                    Required, at least 6 characters
                  </span>
                </label>
                <input
                  id="validation-form-3"
                  v-model.trim="v$.password.$model"
                  v-model="user.password"
                  type="text"
                  name="password"
                  class="form-control"
                  :class="{ 'border-danger': v$.password.$error }"
                  :placeholder="$t('add_user.password')"/>
                <template v-if="v$.password.$error">
                  <div
                    v-for="(error, index) in v$.password.$errors"
                    :key="index"
                    class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
              </div>

              <div class="mt-3 input-form">
                <label
                  for="validation-form-4"
                  class="flex flex-col w-full form-label sm:flex-row">
                  {{ $t('add_user.password_confirmation') }}
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                    Required, at least 6 characters
                  </span>
                </label>
                <input
                  id="validation-form-4"
                  v-model.trim="v$.password_confirmation.$model"
                  v-model="user.password_confirmation"
                  type="text"
                  name="password"
                  class="form-control"
                  :class="{ 'border-danger': v$.password_confirmation.$error }"
                  :placeholder="$t('add_user.password_confirmation')"/>
                <template v-if="v$.password_confirmation.$error">
                  <div
                    v-for="(error, index) in v$.password_confirmation.$errors"
                    :key="index"
                    class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
              </div>
              -->
              
              <div class="mt-2">
                <TomSelect
                  class="w-full"
                  v-model="setting.language"
                  :options="{ placeholder: $t('settings.language') }">
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                </TomSelect>
              </div>

              <button type="submit" class="mt-5 btn btn-primary" @click="update">
                {{ $t('add_user.btn_save') }}
              </button>
            </form>
            <!-- END: Validation Form -->
            
          </Preview>
        </div>
      </PreviewComponent>
      <!-- END: Form Validation -->
    </div>
  </div>
</template>