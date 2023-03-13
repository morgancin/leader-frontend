<script>
  export default {
    name: "ActivitiesCreateView"
  }
</script>

<script setup>
  import { reactive, ref } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";

  import { useQuotesStore } from "../../../stores/leader/quotes";
  import { useActivitiesStore } from "../../../stores/leader/activities";

  import QuotesForm from "../../../components/leader/quotes/Form.vue";
  import ActivityForm from "../../../components/leader/activities/Form.vue";
  import ActivityFinalizeForm from "../../../components/leader/activities/Form_finalize.vue";
  
  const route = useRoute();
  const { fetchActivity, createActivityReschedule } = useActivitiesStore();
  
  const { quote: form_quote } = storeToRefs(useQuotesStore());
  const { activity: form_activity, activity_information } = storeToRefs(useActivitiesStore());
  
  fetchActivity(route.params.id);

  const form_reschedule = reactive({
                        observations:'',
                        activity_result_id:null,
                  });
  
  const form_activities_results_tracking_type = ref(0);

  const ViewActivityForm = (result_form_activities_results_tracking_type) => {
      form_activities_results_tracking_type.value = result_form_activities_results_tracking_type;
  }
  
  const submit = async () => {
      let aData = {};
      
      if(form_activities_results_tracking_type.value == 'quote') {
          aData = { ...form_reschedule, ...form_quote.value };

      }else if(form_activities_results_tracking_type.value == 'activity') {
        aData = { ...form_reschedule, ...form_activity.value };

      }else{
          aData = form_reschedule;
      }
      
      await createActivityReschedule(aData, form_activities_results_tracking_type.value);
  }
</script>

<template>
  <div class="flex items-center mt-8">
    <h2 class="mr-auto text-lg font-medium intro-y">{{ $t('add_activity_finalize.activity_finalize') }}</h2>
  </div>
  
  <!-- BEGIN: Wizard Layout -->
  <div class="py-10 mt-5 intro-y box sm:py-10">
    <div class="px-5 sm:px-10 border-slate-200/60 dark:border-darkmode-400">
      <ActivityFinalizeForm
        @submit="submit"
        @view_activity_form="ViewActivityForm"
        :activity_reschedule="form_reschedule"
        :activity_information="activity_information" />
      <!--v-if="(form_activities_results_tracking_type == 'activity')"-->
      
      <ActivityForm        
        @submit="submit"
        :activity="form_activity" 
        class="mt-5" />
      
        
    </div>
  </div>
  <!-- END: Wizard Layout -->
</template>