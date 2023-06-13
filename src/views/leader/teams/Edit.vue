<script>
    export default {
        name: "UsersEditView"
    }
</script>

<script setup>
  import { ref, watch } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  import { useTeamsStore } from "../../../stores/leader/teams";
  import TeamForm from "../../../components/leader/teams/Form.vue";

  const route = useRoute();
  const show_form = ref(false);
  const { updateTeam, fetchTeam } = useTeamsStore();
  const { team: form_data } = storeToRefs(useTeamsStore());

  fetchTeam(route.params.id);

  watch(
    () => form_data.value,
    () => {
      show_form.value = true;
    }
  );

  const submit = async () => {
    await updateTeam();
  }
</script>

<template>
    <div class="flex items-center mt-8 intro-y">
        <h2 class="mr-auto text-lg font-medium">Update User</h2>
    </div>
    
    <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/dashboard-user`">{{ $t('add_user.btn_prev') }}</router-link>
    <div class="grid grid-cols-1 gap-3 mt-5">
        <TeamForm
          v-if="show_form"
          @submit="submit"
          :team="form_data"
          text-button="Actualizar" />
    </div>
</template>