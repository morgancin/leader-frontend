<script>
    export default {
        name: "CompaniesEditView"
    }
</script>

<script setup>
//import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useCompaniesStore } from "../../../stores/leader/companies";
import CompanyForm from "../../../components/leader/companies/Form.vue";

const route = useRoute();
const { updateCompany, fetchCompany } = useCompaniesStore();
const { company: form, message } = storeToRefs(useCompaniesStore());

fetchCompany(route.params.id);

const submit = async () => {
  await updateCompany(form.value);
  /*
  if ( ! error.value) {
    await router.push({
      name: "courses",
    })
  }
  */
}
</script>

<template>
    <div class="intro-y flex items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">Update Company</h2>
    </div>
    
    <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/companies`">Prev</router-link>
    <div class="grid grid-cols-3 gap-3 mt-5">
        <p v-if="message">{{ message }}</p>
        <CompanyForm
            text-button="Actualizar"
            :company="form"
            @submit="submit"
        />
    </div>
</template>