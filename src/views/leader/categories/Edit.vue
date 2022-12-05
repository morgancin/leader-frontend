<script>
    export default {
      name: "CategoriesEditView"
    }
</script>

<script setup>
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";
    
    import { useCategoriesStore } from "../../../stores/leader/categories";
    import CategoriesForm from "../../../components/leader/categories/Form.vue";
    
    const route = useRoute();
    const { updateCategory, fetchCategory } = useCategoriesStore();
    const { category: form, message } = storeToRefs(useCategoriesStore());

    fetchCategory(route.params.id);
    
    const submit = async () => {
        await updateCategory();
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
          text-button="Actualizar"
          :category="form"
          @submit="submit" />
    </div>
  </div>
</template>