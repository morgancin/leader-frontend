<script>
    export default {
      name: "PricesEditView"
    }
</script>

<script setup>
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";

    import { usePricesStore } from "../../../stores/leader/prices";
    import PricesForm from "../../../components/leader/prices/Form.vue";
    
    const route = useRoute();
    const { updatePrice, fetchPrice } = usePricesStore();
    const { price: form, message } = storeToRefs(usePricesStore());

    fetchPrice(route.params.id);
    
    const submit = async () => {
        await updatePrice();
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
          text-button="Actualizar"
          :price="form"
          @submit="submit" />
    </div>
  </div>
</template>