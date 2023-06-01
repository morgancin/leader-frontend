<!-- <script>
    export default {
    name: "CompanyUserCreateView"
    }
</script> -->

<script setup>
    import { reactive } from 'vue';
    import { storeToRefs } from "pinia";
    import { useCompanyUserStore } from "@/stores/leader/companyUser";
    import CompanyUserForm from "@/components/leader/companyUser/Form.vue"
    
    const { message } = storeToRefs(useCompanyUserStore());
  
    const { createCompanyUser } = useCompanyUserStore();
    
    const form_data = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "usercompany" 
    });
    
    const submit = async () => {
      await createCompanyUser(form_data);
    }    
</script>

<template>
    <div class="flex items-center mt-8 intro-y">
        <h2 class="mr-auto text-lg font-medium">{{ $t('add_company_user.add_company_user') }}</h2>
        <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/company-users`">{{ $t('add_company_user.btn_prev') }}</router-link>
    </div>
    <div class="grid grid-cols-1 gap-3 mt-5">
        <p v-if="message">{{ message.value }}</p>
        <CompanyUserForm
            :companyUser="form_data"
            @submit="submit"/>
    </div>
</template>
    
    