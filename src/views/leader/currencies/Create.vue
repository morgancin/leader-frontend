<script>
  export default {
    name: "CurrenciesCreateView"
  }
</script>

<script setup>
  import { reactive } from "vue";
  import { useCurrenciesStore } from "../../../stores/leader/currencies";
  import CurrenciesForm from "../../../components/leader/currencies/Form.vue";
  
  const { createCurrency } = useCurrenciesStore();

  const form = reactive({
                        code:'',
                        name:'',
                  });

  const submit = async () => {
    await createCurrency(form);
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
          :currency="form"
          @submit="submit" />
    </div>
  </div>
</template>