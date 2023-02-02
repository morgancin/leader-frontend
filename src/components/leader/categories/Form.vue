<script>
    export default {
        name: "CategoriesForm",
    }
</script>

<script setup>
    import { onMounted, ref } from 'vue';

    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    
    import { useGetDataCategories } from '../../../composables/getData/useGetDataCategories';
    
    
    defineProps({
      category: {
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
          <label class="form-label">*{{ $t('add_categories.category_name') }}</label>
          <input
            type="text"
            :placeholder="$t('add_categories.category_name')" 
            class="w-full form-control"
            v-model="category.name" />
        </div>

        <div class="mt-3">
          <label class="form-label">*{{ $t('add_categories.category_list') }}</label>
          <v-select
            label="name"
            class="form-control" 
            :options="dataCategories" 
            :reduce="name => name.id"
            v-model="category.category_id">
          </v-select>
        </div>
        
        <div class="mt-5 text-right">
          <button type="button" class="w-24 mr-1 btn btn-outline-secondary">{{ $t('add_categories.btn_cancel') }}</button>
          <button type="submit" class="w-24 btn btn-primary">{{ $t('add_categories.btn_save') }}</button>
        </div>
      </div>
    </form>
    <!-- END: Form Layout -->
  </div>
</template>