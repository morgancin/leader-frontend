<script>
  export default {
    name: "ActivitiesCreateView"
  }
</script>

<script setup>
  import { ref } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  
  import { useActivitiesStore } from "../../../stores/leader/activities";
  import ActivityForm from "../../../components/leader/activities/Form.vue";
  import ActivityFinalizeForm from "../../../components/leader/activities/Form_finalize.vue";
  
  const route = useRoute();
  const { fetchActivity } = useActivitiesStore();
  const { activity: form, activity_information, message } = storeToRefs(useActivitiesStore());

  fetchActivity(route.params.id);
  
  const submit = async () => {
      //await updateActivityResult();
  }

  const form_activities_results_tracking = ref(0);

  const ViewActivityForm = (result_form_activities_results_tracking) => {
      form_activities_results_tracking.value = result_form_activities_results_tracking;
      console.log(form_activities_results_tracking.value);
  }
</script>

<template>
  <div class="flex items-center mt-8">
    <h2 class="mr-auto text-lg font-medium intro-y">{{ $t('add_activity_finalize.activity_finalize') }}</h2>
  </div>
  
  <!-- BEGIN: Wizard Layout -->
  <div class="py-10 mt-5 intro-y box sm:py-20">
    <div class="px-5 pt-10 mt-10 sm:px-20 border-slate-200/60 dark:border-darkmode-400">
      <ActivityFinalizeForm
        @submit="submit"
        @view_activity_form="ViewActivityForm"
        :activity="form"
        :activity_information="activity_information" />

      <ActivityForm
        v-if="(form_activities_results_tracking == 1)"
        @submit="submit"
        :activity="form" />
    </div>
  </div>
  <!-- END: Wizard Layout -->
</template>