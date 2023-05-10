<script>
    export default {
        name: "PricesForm",
    }
</script>

<script setup>
    import { onMounted, ref } from 'vue';

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import { useGetDataProducts } from '../../../composables/getData/useGetDataProducts';
    import { useGetDataCurrencies } from '../../../composables/getData/useGetDataCurrencies';
    import { useGetDataPriceLists } from '../../../composables/getData/useGetDataPriceLists';
    
    defineProps({
      price: {
            type: Object,
            required: true,
        },
    })

    defineEmits(["submit"]);

    const { fetchProducts, products } = useGetDataProducts();
    const { fetchCurrencies, currencies } = useGetDataCurrencies();
    const { fetchPriceLists, price_lists } = useGetDataPriceLists();
    
    const dataProducts = ref([]);
    const dataCurrencies = ref([]);
    const dataPriceLists = ref([]);
    
    onMounted(async() => {
        await fetchProducts();
        dataProducts.value = products.value;

        await fetchCurrencies();
        dataCurrencies.value = currencies.value;

        await fetchPriceLists();
        dataPriceLists.value = price_lists.value;
    });
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="$emit('submit')" autocomplete="on">
      <div class="p-5 intro-y box">

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_prices.price_product') }}</label>
          <v-select
            label="name"
            class="form-control" 
            :options="dataProducts" 
            :reduce="name => name.id"
            v-model="price.product_id">
          </v-select>
          <!--
            :class="{ 'border-danger': validate.priority.$error }"
          <template v-if="validate.client_origin.$error">
            <div
              v-for="(error, index) in validate.client_origin.$errors"
              :key="index"
              class="mt-2 text-danger">
              {{ error.$message }}
            </div>
          </template>
          -->
        </div>

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_prices.price_currency') }}</label>
          <v-select
            label="name"
            class="form-control" 
            :options="dataCurrencies" 
            :reduce="name => name.id"
            v-model="price.currency_id">
          </v-select>
        </div>

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_prices.price_price_list') }}</label>
          <v-select
            label="name"
            class="form-control" 
            :options="dataPriceLists" 
            :reduce="name => name.id"
            v-model="price.price_list_id">
          </v-select>
        </div>
        
        <div class="mt-3">
          <label class="form-label">*{{ $t('add_prices.price_price') }}</label>
          <input
              type="text"
              class="w-full form-control"
              :placeholder="$t('add_prices.price_price')"
              v-model="price.price" />
        </div>
        
        <div class="mt-5 text-right">
          <button type="button" class="w-24 mr-1 btn btn-outline-secondary">{{ $t('add_prices.btn_cancel') }}</button>
          <button type="submit" class="w-24 btn btn-primary">{{ $t('add_prices.btn_save') }}</button>
        </div>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>
</template>