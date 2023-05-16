<script>
    export default {
      name: "AccountsEditView"
    }
</script>

<script setup>
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";
    
    import { useCurrenciesStore } from "../../../stores/leader/currencies";
    import CurrenciesForm from "../../../components/leader/currencies/Form.vue";

    const route = useRoute();
    const { updateCurrency, fetchCurrency } = useCurrenciesStore();
    const { currency: form, message } = storeToRefs(useCurrenciesStore());

    fetchCurrency(route.params.id);
    
    const submit = async () => {
        await updateCurrency();
    }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_accounts.accounts') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/accounts`">{{ $t('add_accounts.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <CurrenciesForm
          text-button="Actualizar"
          :currency="form"
          @submit="submit" />
    </div>
  </div>
</template>