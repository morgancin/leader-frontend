<script>
  export default {
    name: "ActivitiesTypesCreateView"
  }
</script>

<script setup>
  import { reactive } from "vue";
  import { useActivitiesTypeStore } from "../../../stores/leader/activities-type";
  import ActivityTypeForm from "../../../components/leader/activityType/Form.vue";
  
  const { createActivityType } = useActivitiesTypeStore();

  const form = reactive({
                        name:'',
                        type:'',
                  });

  const submit = async () => {
    await createActivityType(form);
  }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_catalog_activity.activity') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/activity`">{{ $t('add_catalog_activity.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <ActivityTypeForm
          :activity_type="form"
          @submit="submit" />
    </div>
  </div>
</template>