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
    <div class="col-span-12 intro-y ">

      <form id="formulario" class="validate-form" @submit.prevent="submitForm">

        <div class="intro-y box p-5">

          <div class="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
            <div class="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
              <ChevronDownIcon class="w-4 h-4 mr-2" /> {{$t('settings.language')}}
            </div>
            <div class="mt-5">
              
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
                
                <div class="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div class="form-label xl:w-72 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">{{ $t('side-menu.settings-languages') }}</div>                          
                      </div>
                      <div class="leading-relaxed text-slate-500 text-xs mt-3">
                        Idioma con el que visualizas el sistema
                      </div>
                    </div>
                  </div>

                  <div class="w-full mt-3 xl:mt-0 flex-1">
                    <TomSelect
                      class="w-full"
                      v-model="setting.language"
                      :options="{ placeholder: $t('settings.language') }">
                      <option value="es">Español</option>
                      <option value="en">Inglés</option>
                    </TomSelect>
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
              {{ $t('add_user.btn_cancel') }}
            </button>
          <button type="submit" class="btn py-3 btn-primary w-full md:w-52" @click="update">
            {{ $t('add_user.btn_save') }}
          </button>
        </div>

      </form>

    </div>
  </div>
</template>