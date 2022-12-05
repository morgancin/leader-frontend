<script>
    export default {
      name: "PriceListsEditView"
    }
</script>

<script setup>
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";
    
    import { usePriceListStore } from "../../../stores/leader/price-list";
    import PriceListsForm from "../../../components/leader/priceLists/Form.vue";

    const route = useRoute();
    const { updatePriceList, fetchPriceList } = usePriceListStore();
    const { price_list: form, message } = storeToRefs(usePriceListStore());

    fetchPriceList(route.params.id);
    
    const submit = async () => {
        await updatePriceList();
    }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_price_lists.price_lists') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/price-lists`">{{ $t('add_price_lists.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <PriceListsForm
          text-button="Actualizar"
          :price_list="form"
          @submit="submit" />
    </div>
  </div>
</template>