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

    const form_data = reactive({
                                name: '',
                                phone: '',
                                tax_id: '',
                                address: '',
                                website: '',
                                comments: '',
                                potential_value: ''
                            });

    const submit = async () => {
        await createCompany(form_data)
    }
</script>

<template>
    <div class="flex items-center mt-8 intro-y">
        <h2 class="mr-auto text-lg font-medium">{{ $t('add_companies.add_company') }}</h2>
        <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/companies`">{{ $t('add_companies.btn_prev') }}</router-link>
    </div>
    <div class="grid grid-cols-3 gap-3 mt-5">
        <p v-if="message">{{ message.value }}</p>
        <CompanyForm
            :company="form_data"
            @submit="submit"/>
    </div>
</template>