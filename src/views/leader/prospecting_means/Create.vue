<script>
    export default {
      name: "ProspectingMeansCreateView"
    }
</script>

<script setup>
  import { reactive } from "vue";
  import { useProspectingMeansStore } from "@/stores/leader/prospecting-means";
  import ProspectingMeansForm from "../../../components/leader/prospecting_means/Form.vue";
   
  const { createProspectingMeans } = useProspectingMeansStore();
  
  const form_data = reactive({
                        name:'',
                        active:true,
                        account_id:null,
                        prospecting_source_id:null
                    });
  
  const submit = async () => {
    await createProspectingMeans(form_data);
  }
</script>
  
<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">{{ $t('add_origin_medium.origin_medium') }}</h2>
    <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/medium`">{{ $t('add_origin_medium.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <ProspectingMeansForm
        :mean="form_data"
        @submit="submit" />
      <!-- END: Form Layout -->
    </div>
  </div>
</template>