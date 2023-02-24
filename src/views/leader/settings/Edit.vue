<script>
    export default {
        name: "SettingsEditView"
    }
</script>

<script setup>
  import { reactive, ref } from 'vue';
  import { storeToRefs } from "pinia";

  import { useSettingsStore } from "../../../stores/leader/settings";
  import SettingForm from "../../../components/leader/settings/Form.vue";

  const { message } = storeToRefs(useSettingsStore());
  const { updateProfileLanguage } = useSettingsStore();

  const profile_user = ref(JSON.parse(sessionStorage.getItem("session_storage_user")).profile);

  const submit = async () => {
    await updateProfileLanguage(profile_user.value);
      
    /*
    if ( ! error.value) {
      await router.push({
        name: "courses",
      })
    }
    */
  }
</script>

<template>
  <!--
    <div class="flex items-center mt-8 intro-y">
        <h2 class="mr-auto text-lg font-medium">Update User</h2>
    </div>

    <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/dashboard-user`">Prev</router-link>

    :setting="form"
  -->
    <div class="grid grid-cols-3 gap-3 mt-5">
        <p v-if="message">{{ message }}</p>
        <SettingForm
            text-button="Actualizar"
            :setting="profile_user"
            @submit="submit" />
    </div>
</template>