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
    
    const form = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "usercompany" 
    });
    
    const submit = async () => {
      await createCompanyUser(form);
    }    
</script>

<template>
    <div class="intro-y flex items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">{{ $t('add_company_user.add_company_user') }}</h2>
        <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/company-users`">{{ $t('add_company_user.btn_prev') }}</router-link>
    </div>
    <div class="grid grid-cols-1 gap-3 mt-5">
        <p v-if="message">{{ message.value }}</p>
        <CompanyUserForm
            :companyUser="form"
            @submit="submit"/>
    </div>
</template>
    
    