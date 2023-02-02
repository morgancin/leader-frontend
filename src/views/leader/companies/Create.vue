<script>
    export default {
    name: "CompaniesCreateView"
    }
</script>

<script setup>
    import { reactive } from "vue";
    import { storeToRefs } from "pinia";
    import { useCompaniesStore } from "../../../stores/leader/companies";
    import CompanyForm from "../../../components/leader/companies/Form.vue";

    const { message } = storeToRefs(useCompaniesStore());

    const { createCompany } = useCompaniesStore();

    const formData = reactive({
        city:"",
        name: "",
        email: "",
        state: "",
        password: "",
        postal_code: "",
        password_confirmation: "",
        role: "company",
    });

    const submit = async () => {
        await createCompany(formData)
    }
</script>

<template>
    <div class="intro-y flex items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">{{ $t('add_companies.add_company') }}</h2>
        <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/companies`">{{ $t('add_companies.btn_prev') }}</router-link>
    </div>
    <div class="grid grid-cols-3 gap-3 mt-5">
        <p v-if="message">{{ message.value }}</p>
        <CompanyForm
            :company="formData"
            @submit="submit"/>
    </div>
</template>