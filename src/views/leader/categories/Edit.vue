<script>
    export default {
      name: "CategoriesEditView"
    }
</script>

<script setup>
    import { ref, watch } from 'vue';
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";
    
    import { useCategoriesStore } from "../../../stores/leader/categories";
    import CategoriesForm from "../../../components/leader/categories/Form.vue";
    
    const route = useRoute();
    const show_form = ref(false);
    const { updateCategory, fetchCategory } = useCategoriesStore();
    const { category: form_data } = storeToRefs(useCategoriesStore());

    fetchCategory(route.params.id);
    
    watch(
      () => form_data.value,
      () => {
        show_form.value = true;
      }
    );
    
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
        v-if="show_form"
        @submit="submit"
        :category="form_data"
        text-button="Actualizar" />
    </div>
  </div>
</template>