<script>
    export default {
      name: "ActivitiesTypesEditView"
    }
</script>

<script setup>
    import { ref, watch } from 'vue';
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";
    
    import { useActivitiesResultStore } from "../../../stores/leader/activities-results";
    import ActivityResultForm from "../../../components/leader/activityResult/Form.vue";

    const route = useRoute();
    const show_form = ref(false);
    const { updateActivityResult, fetchActivityResult } = useActivitiesResultStore();
    //const { activity_result: form, message } = storeToRefs(useActivitiesResultStore());
    const { activity_result: form_data } = storeToRefs(useActivitiesResultStore());

    fetchActivityResult(route.params.id);

    watch(
      () => form_data.value,
      () => {
        show_form.value = true;
      }
    );

    const submit = async () => {
      await updateActivityResult();
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
        v-if="show_form"
        @submit="submit"
        text-button="Actualizar"
        :activity_result="form_data" />
    </div>
  </div>
</template>