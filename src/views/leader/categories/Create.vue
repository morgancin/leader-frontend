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

  const form = reactive({
                      name:'',
                      category_id:''
                  });
  /*
  //import { required } from '@vuelidate/validators';
  //import { useVuelidate } from '@vuelidate/core';

  //import { toast } from 'vue3-toastify';
  //import 'vue3-toastify/dist/index.css';
  
  ////////RULES
  const rules = {
    name: { required }
  }
  
  const validate = useVuelidate(rules, form);
  */

  const submit = async () => {
    /*
    validate.value.$touch();
    
    if (validate.value.$invalid) {
      toast.error('Error de validación', {
                    autoClose:1000,
                  });
    }

    const result = await validate.value.$validate();
    
    if(result) {
      
    }
    */
    await createCategory(form);
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
          :category="form"
          @submit="submit" />
    </div>
  </div>
</template>