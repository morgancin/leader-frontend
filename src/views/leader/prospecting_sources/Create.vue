<script>
    export default {
      name: "ProspectingSourcesCreateView"
    }
</script>

<script setup>
  import { reactive } from "vue";
  import { useProspectingSourcesStore } from "@/stores/leader/prospecting-sources";
  import ProspectingSourcesForm from "../../../components/leader/prospecting_sources/Form.vue";
   
  const { createProspectingSources } = useProspectingSourcesStore();
  
  const form = reactive({
                        description:'',
                        account_id:null,
                    });
  
  const submit = async () => {
    await createProspectingSources(form);
  }
</script>
  
<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">{{ $t('add_catalog_origin.origins') }}</h2>
    <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/origin`">{{ $t('add_catalog_origin.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <ProspectingSourcesForm
        :source="form"
        @submit="submit" />
      <!-- END: Form Layout -->
    </div>
  </div>
</template>