<script>
  export default {
    name: "ProductsCreateView"
  }
</script>

<script setup>
  import { reactive } from "vue";
  import { useProductsStore } from "../../../stores/leader/products";
  import ProductsForm from "../../../components/leader/products/Form.vue";
  
  const { createProduct } = useProductsStore();

  const form = reactive({
                        sku:'',
                        name:'',
                        quantity:'',
                        description:'',
                        category_id:'',
                  });

  const submit = async () => {
    await createProduct(form);
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
          :product="form"
          @submit="submit" />
    </div>
  </div>
</template>