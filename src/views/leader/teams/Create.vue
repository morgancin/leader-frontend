<script>
  export default {
    name: "UsersCreateView"
  }
</script>
  
<script setup>
  import { reactive } from "vue";
  import { storeToRefs } from "pinia";
  import { useTeamsStore } from "../../../stores/leader/teams";
  import TeamForm from "../../../components/leader/teams/Form.vue";
  
  const { message } = storeToRefs(useTeamsStore());
  
  const { createTeam } = useTeamsStore();
  
  const form_data = reactive({
    name:'',
    active:true,
    is_carousel:true,
    users:[],
    prospecting_sources:[]
  });

  const submit = async () => {
    await createTeam(form_data)
  }
</script>
  
<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('teams.title') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/teams`">{{ $t('teams.buttons.prev') }}</router-link>
  </div>
  
  <div class="grid grid-cols-1 gap-3 mt-5">
    <TeamForm
        :team="form_data"
        @submit="submit"/>
  </div>
</template>