<script>
  export default {
    name: "PipelineCreateView"
  }
</script>

<script setup>
  import { reactive } from "vue";
  import { usePipelinesStore } from "../../../stores/leader/pipelines";
  import PipelinesForm from "../../../components/leader/pipelines/Form.vue";
  
  const { createPipeline } = usePipelinesStore();

  const form = reactive({
                        id:'',
                        name:'',
                        is_default:''                        
                  });

  const submit = async () => {
    //await createPipeline(form);
  }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_pipelines.pipelines') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/pipelines`">{{ $t('forms.previous') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <PipelinesForm
          :pipeline="form"
          @submit="submit" />
    </div>
  </div>
</template>