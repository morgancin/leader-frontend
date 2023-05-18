<script>
    export default {
      name: "ActivitiesSubjectsEditView"
    }
</script>

<script setup>
  import { ref, watch } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  
  import { useActivitySubjectStore } from "../../../stores/leader/activities-subjects";
  import ActivitySubjectForm from "../../../components/leader/activitySubjects/Form.vue";
  
  const route = useRoute();
  const show_form = ref(false);
  const { updateActivitySubject, fetchActivitySubject } = useActivitySubjectStore();
  const { subject: form_data } = storeToRefs(useActivitySubjectStore());
  
  fetchActivitySubject(route.params.id);
  
  watch(
    () => form_data.value,
    () => {
      show_form.value = true;
    }
  );
  
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
        v-if="show_form"
        @submit="submit"
        :subject="form_data"
        text-button="Actualizar" />
    </div>
  </div>
</template>