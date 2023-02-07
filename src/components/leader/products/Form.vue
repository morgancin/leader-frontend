<script>
    export default {
        name: "ProductsForm",
    }
</script>

<script setup>
    import { onMounted, ref } from 'vue';

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    import { useGetDataCategories } from '../../../composables/getData/useGetDataCategories';
    
    defineProps({
      product: {
            type: Object,
            required: true,
        },
    })

    defineEmits(["submit"]);

    const { fetchCategories, results, error } = useGetDataCategories();

    const dataCategories = ref([]);
    
    onMounted(async() => {
        await fetchCategories();
        dataCategories.value = results.value;
    });
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="$emit('submit')" autocomplete="on">
      <div class="p-5 intro-y box">

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_products.product_category') }}</label>
          <v-select
            label="name"
            class="form-control" 
            :options="dataCategories" 
            :reduce="name => name.id"
            v-model="product.category_id">
          </v-select>
          <!--
            :class="{ 'border-danger': validate.service_priority.$error }"
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
          <label class="form-label">*{{ $t('add_products.product_sku') }}</label>
          <input
              type="text"
              class="w-full form-control"
              :placeholder="$t('add_products.product_sku')"
              v-model="product.sku" />
        </div>

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_products.product_name') }}</label>
          <input
              type="text"
              class="w-full form-control"
              :placeholder="$t('add_products.product_name')"
              v-model="product.name" />
        </div>

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_products.product_description') }}</label>
          <input
              type="text"
              class="w-full form-control"
              :placeholder="$t('add_products.product_description')"
              v-model="product.description" />
        </div>

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_products.product_quantity') }}</label>
          <input
              type="text"
              class="w-full form-control"
              :placeholder="$t('add_products.product_quantity')"
              v-model="product.quantity" />
        </div>
        
        <div class="mt-5 text-right">
          <button type="button" class="w-24 mr-1 btn btn-outline-secondary">{{ $t('add_products.btn_cancel') }}</button>
          <button type="submit" class="w-24 btn btn-primary">{{ $t('add_products.btn_save') }}</button>
        </div>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>
</template>