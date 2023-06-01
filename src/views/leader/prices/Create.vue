<script>
  export default {
    name: "PricesCreateView"
  }
</script>

<script setup>
  import { reactive } from "vue";
  import { usePricesStore } from "../../../stores/leader/prices";
  import PricesForm from "../../../components/leader/prices/Form.vue";
  
  const { createPrice } = usePricesStore();

  const form_data = reactive({
                      price:'',
                      active:true,
                      product_id:'',
                      currency_id:'',
                      price_list_id:'',
                  });

  const submit = async () => {
    await createPrice(form_data);
  }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_prices.prices') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/prices`">{{ $t('add_prices.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <PricesForm
          :price="form_data"
          @submit="submit" />
    </div>
  </div>
</template>