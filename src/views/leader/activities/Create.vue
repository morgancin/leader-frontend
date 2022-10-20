<script setup>
import { reactive } from "vue";
import { useActivitiesTypeStore } from "../../../stores/leader/activities-type";
import activityTypeForm from "../../../components/leader/activityType/Form.vue"


const { createActivityType } = useActivitiesTypeStore();

const form = reactive({
      name:"leader",
      type:""
});

const submit = async () => {
  await createActivityType(form);
}
</script>

<template>
  <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">{{ $t('add_catalog_activity.activity_type') }}</h2>
      <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/activity`">{{ $t('add_catalog_activity.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="intro-y col-span-12 lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <activityTypeForm
        :activity="form"
        @submit="submit"/>
      <!-- END: Form Layout -->
    </div>
  </div>
</template>