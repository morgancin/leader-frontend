<script>
    export default {
      name: "PipelinesEditView"
    }
</script>

<script setup>
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";
    
    import { usePipelinesStore } from "../../../stores/leader/pipelines";
    import PipelinesForm from "../../../components/leader/pipelines/Form.vue";

    const route = useRoute();
    const { updatePipeline, fetchPipeline } = usePipelinesStore();
    const { pipeline: form, message } = storeToRefs(usePipelinesStore());

    fetchPipeline(route.params.id);
    
    const submit = async () => {
        await updateCurrency();
    }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_pipelines.pipelines') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/pipelines`">{{ $t('add_currencies.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <PipelinesForm
          text-button="Actualizar"
          :pipeline="form"
          @submit="submit" />
    </div>
  </div>
</template>