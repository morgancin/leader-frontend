<script>
    export default {
      name: "ActivitiesSubjectsCreateView"
    }
</script>

<script setup>
    import { reactive } from "vue";
    import { useActivitySubjectStore } from "../../../stores/leader/activities-subjects";
    import ActivitySubjectForm from "../../../components/leader/activitySubjects/Form.vue";
    
    const { createActivitySubject } = useActivitySubjectStore();
    
    const form_data = reactive({
                        name:'',
                        active:true,
                        activity_type_id:'',
                    });

    const submit = async () => {
      await createActivitySubject(form_data);
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
        :subject="form_data" 
        @submit="submit" />
    </div>
  </div>
</template>