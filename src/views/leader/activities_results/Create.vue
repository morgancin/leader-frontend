<script>
  export default {
    name: "ActivitiesTypesCreateView"
  }
</script>

<script setup>
  import { reactive } from "vue";

  import { useActivitiesResultStore } from "../../../stores/leader/activities-results";
  import ActivityResultForm from "../../../components/leader/activityResult/Form.vue";

  const { createActivityResult } = useActivitiesResultStore();

  const form_data = reactive({
                        name:null,
                        active:true,
                        is_tracking:false,
                        activity_type_id:null,
                        pipeline_stage_id:null
                  });

  const submit = async () => {
    await createActivityResult(form_data);
  }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_catalog_activity_result.activity_result') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/activity-results`">{{ $t('add_catalog_activity_result.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <ActivityResultForm
          :activity_result="form_data"
          @submit="submit" />
    </div>
  </div>
</template>