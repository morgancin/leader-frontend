<script>
    export default {
      name: "ActivitiesSubjectsEditView"
    }
</script>

<script setup>
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";
   
    import { useActivitySubjectStore } from "../../../stores/leader/activities-subjects";
    import ActivitySubjectForm from "../../../components/leader/activitySubjects/Form.vue";

    const route = useRoute();
    const { updateActivitySubject, fetchActivitySubject } = useActivitySubjectStore();
    const { subject: form, message } = storeToRefs(useActivitySubjectStore());

    fetchActivitySubject(route.params.id);
    
    const submit = async () => {
        await updateActivitySubject();
    }
</script>
<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_catalog_subject.subject') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/subjects`">{{ $t('add_catalog_subject.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <ActivitySubjectForm
          text-button="Actualizar"
          :subject="form" 
          @submit="submit" />
    </div>
  </div>
</template>