<script>
    export default {
      name: "ActivitiesTypesEditView"
    }
</script>

<script setup>
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";

    import { useActivitiesTypeStore } from "../../../stores/leader/activities-type";
    import ActivityTypeForm from "../../../components/leader/activityType/Form.vue";

    const route = useRoute();
    const { updateActivityType, fetchActivityType } = useActivitiesTypeStore();
    const { activity_type: form, message } = storeToRefs(useActivitiesTypeStore());

    fetchActivityType(route.params.id);
    
    const submit = async () => {
        await updateActivityType();
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
          text-button="Actualizar"
          :activity_type="form"
          @submit="submit" />
    </div>
  </div>
</template>