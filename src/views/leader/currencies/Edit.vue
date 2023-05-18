<script>
    export default {
      name: "CurrenciesEditView"
    }
</script>

<script setup>
  import { ref, watch } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  import { useCurrenciesStore } from "../../../stores/leader/currencies";
  import CurrenciesForm from "../../../components/leader/currencies/Form.vue";
  
  const route = useRoute();
  const show_form = ref(false);
  const { updateCurrency, fetchCurrency } = useCurrenciesStore();
  const { currency: form_data } = storeToRefs(useCurrenciesStore());

  fetchCurrency(route.params.id);
  
  watch(
      () => form_data.value,
      () => {
        show_form.value = true;
      }
  );

  const submit = async () => {
    await updateCurrency();
  }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_currencies.currencies') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/currencies`">{{ $t('add_currencies.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <CurrenciesForm
        v-if="show_form"
        @submit="submit"
        :currency="form_data"
        text-button="Actualizar" />
    </div>
  </div>
</template>