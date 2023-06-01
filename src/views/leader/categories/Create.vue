<script>
  export default {
    name: "CategoriesCreateView"
  }
</script>

<script setup>
  import { reactive } from "vue";
  import CategoriesForm from "../../../components/leader/categories/Form.vue";

  import { useCategoriesStore } from "../../../stores/leader/categories";
  
  const { createCategory } = useCategoriesStore();

  const form_data = reactive({
                      name:'',
                      active:true,
                      category_id:''
                  });

  const submit = async () => {
    await createCategory(form_data);
  }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_categories.categories') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/categories`">{{ $t('add_categories.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <CategoriesForm
        :category="form_data"
        @submit="submit" />
    </div>
  </div>
</template>