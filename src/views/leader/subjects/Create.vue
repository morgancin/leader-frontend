<script setup>
import { reactive } from "vue";
import { useActivitySubjectStore } from "../../../stores/leader/activities-subjects";
import ActivitySubjectForm from "../../../components/leader/activitySubjects/Form.vue"


const { createActivitySubject } = useActivitySubjectStore();

const form = reactive({
      activity_type_id:"1",
      name:""
});

const submit = async () => {
  await createActivitySubject(form);
}
</script>

<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">{{ $t('add_catalog_subject.subject_type') }}</h2>
    <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/subjects`">{{ $t('add_catalog_subject.btn_prev') }}
    </router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="intro-y col-span-12 lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <ActivitySubjectForm 
        :subject="form" 
        @submit="submit" />
      <!-- END: Form Layout -->
    </div>
  </div>
</template>