<script>
  export default {
    name: "PriceListsCreateView"
  }
</script>

<script setup>
  import { reactive } from "vue";
  import { usePriceListStore } from "../../../stores/leader/price-list";
  import PriceListsForm from "../../../components/leader/priceLists/Form.vue";
  
  const { createPriceList } = usePriceListStore();

  const form = reactive({
                        name:'',
                        account_id:''
                  });

  const submit = async () => {
    await createPriceList(form);
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
          :price_list="form"
          @submit="submit" />
    </div>
  </div>
</template>