<script>
  export default {
    name: "ProductsCreateView"
  }
</script>

<script setup>
  import { ref, watch, reactive } from 'vue';

  import { useProductsStore } from "../../../stores/leader/products";
  
  import ProductsForm from "../../../components/leader/products/Form.vue";
  import { useGetDataPricesLists } from '../../../composables/getData/useGetDataPricesLists';
  
  const { createProduct } = useProductsStore();
  const { fetchPricesLists, results_prices_lists, error_prices_lists } = useGetDataPricesLists();

  fetchPricesLists();

  const form_data = reactive({
                        sku:null,
                        name:null,
                        active:true,
                        quantity:null,
                        account_id:null,
                        category_id:null,
                        description:null,
                        components:[],
                        price_lists:[]                   
                  });
  watch(
      () => results_prices_lists.value,
      () => {
        results_prices_lists.value.forEach((item) => {
          form_data.price_lists.push({
                                      price: null,
                                      name: item.name,
                                      currency_id: null,
                                      price_list_id: item.id
                                    });
        });
      }
  );

  const submit = async () => {
    await createProduct(form_data);
  }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_products.products') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/products`">{{ $t('add_products.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <ProductsForm
        @submit="submit"
        :product="form_data" />
    </div>
  </div>
</template>