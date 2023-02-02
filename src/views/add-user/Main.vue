<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Add User</h2>
  </div>
    <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/dashboard-user`">Prev</router-link>

  <div class="flex items-center mt-8">
    <h2 class="intro-y text-lg font-medium mr-auto">Wizard Layout</h2>
  </div>
  <!-- BEGIN: Wizard Layout -->
  <div class="intro-y box py-10 sm:py-20 mt-5">
    <div
      class="relative before:hidden before:lg:block before:absolute before:w-[69%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 sm:px-20"
    >
      <div
        class="intro-x lg:text-center flex items-center lg:block flex-1 z-10"
      >
        <button class="w-10 h-10 rounded-full btn btn-primary">1</button>
        <div class="lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto">
          Create New Account
        </div>
      </div>
      <div
        class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10"
      >
        <button
          class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400"
        >
          2
        </button>
        <div
          class="lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
        >
          Setup Your Profile
        </div>
      </div>
      <div
        class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10"
      >
        <button
          class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400"
        >
          3
        </button>
        <div
          class="lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
        >
          Setup Your Business Details
        </div>
      </div>
      <div
        class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10"
      >
        <button
          class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400"
        >
          4
        </button>
        <div
          class="lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
        >
          Setup Billing Account
        </div>
      </div>
      <div
        class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10"
      >
        <button
          class="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400"
        >
          5
        </button>
        <div
          class="lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
        >
          Finalize your purchase
        </div>
      </div>
    </div>
    <div
      class="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400"
    >
      <div class="font-medium text-base">Profile Settings</div>
      <div class="grid grid-cols-12 gap-4 gap-y-5 mt-5">
        <div class="intro-y col-span-12 sm:col-span-6">
          <label for="input-wizard-1" class="form-label">From</label>
          <input
            id="input-wizard-1"
            type="text"
            class="form-control"
            placeholder="example@gmail.com"
          />
        </div>
        <div class="intro-y col-span-12 sm:col-span-6">
          <label for="input-wizard-2" class="form-label">To</label>
          <input
            id="input-wizard-2"
            type="text"
            class="form-control"
            placeholder="example@gmail.com"
          />
        </div>
        <div class="intro-y col-span-12 sm:col-span-6">
          <label for="input-wizard-3" class="form-label">Subject</label>
          <input
            id="input-wizard-3"
            type="text"
            class="form-control"
            placeholder="Important Meeting"
          />
        </div>
        <div class="intro-y col-span-12 sm:col-span-6">
          <label for="input-wizard-4" class="form-label">Has the Words</label>
          <input
            id="input-wizard-4"
            type="text"
            class="form-control"
            placeholder="Job, Work, Documentation"
          />
        </div>
        <div class="intro-y col-span-12 sm:col-span-6">
          <label for="input-wizard-5" class="form-label">Doesn't Have</label>
          <input
            id="input-wizard-5"
            type="text"
            class="form-control"
            placeholder="Job, Work, Documentation"
          />
        </div>
        <div class="intro-y col-span-12 sm:col-span-6">
          <label for="input-wizard-6" class="form-label">Size</label>
          <select id="input-wizard-6" class="form-select">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div>
        <div
          class="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5"
        >
          <button class="btn btn-secondary w-24">Previous</button>
          <button class="btn btn-primary w-24 ml-2">Next</button>
        </div>
      </div>
    </div>
  </div>
  <!-- END: Wizard Layout -->
  
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="intro-y col-span-12 lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <form @submit.prevent="addUser" autocomplete="on">
        <div class="intro-y box p-5">
          <div class="mt-3">
            <label class="form-label">Name</label>
            <input v-model="user.name" type="text" class="form-control w-full" placeholder="Name" />
          </div>
          <div class="mt-3">
            <label class="form-label">Email</label>
            <input v-model="user.email" type="text" class="form-control w-full" placeholder="Email" />
          </div>
          <div class="mt-3">
            <label class="form-label">Password</label>
            <input v-model="user.password" type="password" class="form-control w-full" placeholder="Password" />
          </div>
          <div class="mt-3">
            <label class="form-label">Password Confirmation</label>
            <input v-model="user.password_confirmation" type="password" class="form-control w-full" placeholder="Password Confirmation" />
          </div>
          <div class="text-right mt-5">
            <button type="button" class="btn btn-outline-secondary w-24 mr-1">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary w-24">Save</button>
          </div>
        </div>
      </form>
      <!-- END: Form Layout -->
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useUsersStore } from "../../stores/leader/users";
const { createUser } = useUsersStore();

const user = reactive({
       name:"",
       email:"",
       password:"",
       password_confirmation:"",
       role:"leader",
});

const addUser = async () => {
  await createUser(user);
  
}
</script>
