<script>
    export default {
      name: "ProductsEditView"
    }
</script>

<script setup>
  import { ref, watch, reactive } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  
  import { useProductsStore } from "../../../stores/leader/products";
  import ProductsForm from "../../../components/leader/products/Form.vue";

  const route = useRoute();
  const show_form = ref(false);
  const { updateProduct, fetchProduct } = useProductsStore();
  const { product: form_data} = storeToRefs(useProductsStore());

  fetchProduct(route.params.id);
  
  watch(
      () => form_data.value,
      () => {
        show_form.value = true;
      }
  );

  const submit = async () => {
    await updateProduct();
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
        v-if="show_form"
        @submit="submit"
        :product="form_data" />
    </div>
  </div>
</template>