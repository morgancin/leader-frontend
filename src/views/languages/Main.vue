<script setup>
  /*
  import { ref } from "vue";
  
  //import { useI18n } from "vue-i18n";
  //const { t } = useI18n();
  
  //import i18n from "../../language/i18n";
  //const { t } = i18n.global;
  
  //const morgan = ref('settings.language');
  
  const select = ref("1");
  const selectMultiple = ref(["1", "3"]);
  const selectHeader = ref(["2", "3", "5"]);
  */
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
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">{{ $t('settings.language') }}</h2>
  </div>
  <!-- BEGIN: Basic Select -->
  <div class="mt-3">
    <!-- BEGIN: Form -->
    <form id="formulario" class="validate-form" @submit.prevent="submitForm">
      <div class="mt-2">
        <TomSelect v-model="$i18n.locale" :options="{
                        placeholder: $t('settings.language'),
                      }" class="w-full">
          <option value="es">Español</option>
          <option value="en">Inglés</option>
        </TomSelect>
      </div>
      <button type="submit" class="btn btn-primary mt-5" @click="update">
        {{ $t('add_user.btn_save') }}
      </button>
    </form>
    <!-- END: Form -->
  </div>
  <!-- END: Basic Select -->
</template>
