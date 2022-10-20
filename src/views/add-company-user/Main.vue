<template>
    <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">{{ $t('add_company_user.add_company_user') }}</h2>
  </div>
    <router-link class="btn btn-primary shadow-md mr-2" :to="`/company-users`">{{ $t('add_company_user.btn_prev') }}</router-link>
  <!-- <div class="mt-5 flex flex-row flex-wrap gap-4"> -->
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="intro-y col-span-12 lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <form @submit.prevent="addCompanyUser" autocomplete="on">
        <div class="intro-y box p-5">
          <div class="mt-3">
            <label class="form-label">{{ $t('add_company_user.name') }}</label>
            <input 
              v-model="user.name" 
              :placeholder="$t('add_company_user.name')"
              type="text" 
              class="form-control w-full"/>
          </div>
          <div class="mt-3">
            <label class="form-label">{{ $t('add_company_user.email') }}</label>
            <input 
              v-model="user.email" 
              :placeholder="$t('add_company_user.email')"
              type="text" 
              class="form-control w-full"/>
          </div>
          <div class="mt-3">
            <label class="form-label">{{ $t('add_company_user.password') }}</label>
            <input 
              v-model="user.password"
              :placeholder="$t('add_company_user.password')"
              type="password" 
              class="form-control w-full"/>
          </div>
          <div class="mt-3">
            <label class="form-label">{{ $t('add_company_user.password_confirmation') }}</label>
            <input 
              v-model="user.password_confirmation" 
              :placeholder="$t('add_company_user.password_confirmation')"
              type="password" 
              class="form-control w-full"/>
          </div>
          <div class="text-right mt-5">
            <button type="button" class="btn btn-outline-secondary w-24 mr-1">{{ $t('add_company_user.btn_cancel') }}</button>
            <!-- <button type="submit" class="btn btn-primary w-24">{{ $t('add_company_user.btn_save') }}</button> -->
            <button class="btn btn-primary w-24" @click="successNotificationToggle">{{ $t('add_company_user.btn_save') }}</button>
          </div>
        </div>
      </form>
      <!-- END: Form Layout -->
      <!-- BEGIN: Notification Content -->
      <Notification refKey="successNotification" class="flex">
          <CheckCircleIcon class="text-success" />
          <div class="ml-4 mr-4">
              <div class="font-medium">{{ $t('add_company_user.notification_save') }}</div>
              <div class="text-slate-500 mt-1">
                {{ $t('add_company_user.notification_msg') }}
              </div>
          </div>
      </Notification>
      <!-- END: Notification Content -->
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, provide } from 'vue';
import { useUsersStore } from "../../stores/leader/users";
const { createUser } = useUsersStore();


const user = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "usercompany" 
});

const addCompanyUser = async () => {
  await createUser(user);
}

// Success notification
const successNotification = ref();
  provide("bind[successNotification]", (el) => {
// Binding
  successNotification.value = el;
});
const successNotificationToggle = () => {
// Show notification
  successNotification.value.showToast();
};

</script>

