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
  
  const form_data = reactive({
    name:"",
    email:"",
    password:"",
    accounts:[],
    active:true,
    role:"leader",
    password_confirmation:""
  });

  const submit = async () => {
    await createUser(form_data)
  }
</script>
  
<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_user.add_user') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/dashboard-user`">{{ $t('add_user.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-1 gap-3 mt-5">
    <p v-if="message">{{ message.value }}</p>
    <UserForm
        :user="form_data"
        @submit="submit"/>
  </div>
</template>