<script>
    export default {
      name: "ProspectingSourcesEditView"
    }
</script>

<script setup>
  /*
  import { useProspectingSourcesStore } from "@/stores/leader/prospecting-sources";
  
  const { createProspectingSources } = useProspectingSourcesStore();
   //import { useClientOriginStore } from "@/stores/leader/client-origin";
  */
  import { ref, watch } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";

  import { useProspectingSourcesStore } from "@/stores/leader/prospecting-sources";
  import ProspectingSourcesForm from "../../../components/leader/prospecting_sources/Form.vue";
  
  const route = useRoute();
  const show_form = ref(false);
  const { updateProspectingSources, fetchProspectingSource } = useProspectingSourcesStore();
  const { prospecting_source: form_data } = storeToRefs(useProspectingSourcesStore());
  
  fetchProspectingSource(route.params.id);
  
  watch(
    () => form_data.value,
    () => {
      show_form.value = true;
    }
  );
  
  const submit = async () => {
    await updateProspectingSources();
  }
</script>
<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_catalog_origin.origins') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/prospecting-sources`">{{ $t('add_catalog_origin.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <ProspectingSourcesForm
        v-if="show_form"
        @submit="submit"
        :source="form_data"
        text-button="Actualizar" />
    </div>
  </div>
</template>