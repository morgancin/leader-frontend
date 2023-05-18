<script>
    export default {
      name: "OriginsMediumsEditView"
    }
</script>

<script setup>
  import { ref, watch } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  
  import { useProspectingMeansStore } from "@/stores/leader/prospecting-means";
  import ProspectingMeansForm from "../../../components/leader/prospecting_means/Form.vue";
  
  const route = useRoute();
  const show_form = ref(false);
  const { updateProspectingMeans, fetchProspectingMean } = useProspectingMeansStore();
  const { prospecting_mean: form_data } = storeToRefs(useProspectingMeansStore());
  
  fetchProspectingMean(route.params.id);
  
  watch(
      () => form_data.value,
      () => {
        show_form.value = true;
      }
  );
  
  const submit = async () => {
    await updateProspectingMeans();
  }
</script>
<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_origin_medium.origin_medium') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/prospecting-means`">{{ $t('add_origin_medium.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <ProspectingMeansForm
        v-if="show_form"
        @submit="submit"
        :mean="form_data"
        text-button="Actualizar"/>
    </div>
  </div>
</template>