<script>
  export default {
    name: "UsersCreateView"
  }
</script>
  
<script setup>
  import { reactive } from "vue";
  import { storeToRefs } from "pinia";
  import { useUsersStore } from "../../../stores/leader/users";
  import UserForm from "../../../components/leader/users/Form.vue";
  
  const { message } = storeToRefs(useUsersStore());
  
  const { createUser } = useUsersStore();
  
  const formData = reactive({
    name:"",
    email:"",
    password:"",
    password_confirmation:"",
    role:"leader",
  });

  const submit = async () => {
    await createUser(formData)
  }
</script>
  
<template>
  <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">{{ $t('add_user.add_user') }}</h2>
      <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/dashboard-user`">{{ $t('add_user.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-1 gap-3 mt-5">
    <p v-if="message">{{ message.value }}</p>
    <UserForm
        :user="formData"
        @submit="submit"/>
  </div>
</template>