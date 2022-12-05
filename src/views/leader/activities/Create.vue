<script>
  export default {
    name: "ProspectsCreateView"
  }
</script>

<script setup>
  import { storeToRefs } from "pinia";
  import { useProspectsStore } from "../../../stores/leader/prospects";
  import { useActivitiesStore } from "../../../stores/leader/activities";
  import ActivitieForm from "../../../components/leader/activities/Form.vue";
  import ProspectStep1Form from "../../../components/leader/prospects/Form_step_1.vue";
  import ProspectStep2Form from "../../../components/leader/prospects/Form_step_2.vue";

  const { createProspectActivity } = useProspectsStore();
  const { prospect: form, step } = storeToRefs(useProspectsStore());
  const { activity: form_activity } = storeToRefs(useActivitiesStore());
  
  const submitStep = async () => {
    step.value = (step.value == 1) ? 2 : 3;
  }
  
  const submit = async () => {
    const data_prospect_activity = {...form.value, ...form_activity.value};
    await createProspectActivity(data_prospect_activity);
  }
</script>

<template>
  <div class="flex items-center mt-8">
    <h2 class="mr-auto text-lg font-medium intro-y">{{ $t('add-prospect.prospect') }}</h2>
  </div>
  <!-- BEGIN: Wizard Layout -->
  <div class="py-10 mt-5 intro-y box sm:py-20">
    <div class="relative before:hidden before:lg:block before:absolute before:w-[69%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 sm:px-20">
      <div class="z-10 flex items-center flex-1 intro-x lg:text-center lg:block" v-if="(step >= 1)">
        <button class="w-10 h-10 rounded-full btn btn-primary">1</button>
        <div class="ml-3 text-base font-medium lg:w-32 lg:mt-3 lg:mx-auto">
          {{ $t('add-prospect.prospect-details') }}
        </div>
      </div>

      <div class="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:block lg:mt-0">
        <button class="w-10 h-10 rounded-full btn btn-primary" v-if="(step >= 2)">2</button>
        <button class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400" v-else>2</button>
        <div class="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto text-slate-600 dark:text-slate-400">
          {{ $t('add-prospect.prospect-address') }}
        </div>
      </div>
      
      <div class="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:mt-0 lg:block">
        <button class="w-10 h-10 rounded-full btn btn-primary" v-if="(step >= 3)">3</button>
        <button class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400" v-else>3</button>
        <div class="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto text-slate-600 dark:text-slate-400">
          {{ $t('add-prospect.activity') }}
        </div>
      </div>
    </div>
    
    <div class="px-5 pt-10 mt-10 border-t sm:px-20 border-slate-200/60 dark:border-darkmode-400">
      <ProspectStep1Form
        v-if="(step == 1)"
        @submit="submitStep"
        :prospect="form" />

      <ProspectStep2Form
      v-if="(step == 2)"
        @submit="submitStep"
        :prospect="form" />
        
      <ActivitieForm
        v-if="(step == 3)"
        @submit="submit"
        :activity="form_activity" />
    </div>
  </div>
  <!-- END: Wizard Layout -->
</template>