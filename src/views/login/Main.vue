<template>
  <div>
    <!-- <DarkModeSwitcher /> -->
    <div class="container sm:px-10">
      <div class="block grid-cols-2 gap-4 xl:grid">
        <!-- BEGIN: Login Info -->
        <div class="flex-col hidden min-h-screen xl:flex">
          <a href="" class="flex items-center pt-5 -intro-x">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="w-60"
              src="@/assets/images/leader_light.png"/>
            <!-- <span class="ml-3 text-lg text-white"> Rubick </span> -->
          </a>
          <div class="my-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="w-1/2 -intro-x"
              src="@/assets/images/projections.svg"/>

                <!--
                <div class="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                  A few more clicks to <br />
                  sign in to your account.
                </div>
                <div class="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                  Manage all your e-commerce accounts in one place
                </div>
                -->

          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
          <div class="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
            <div class="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
              <form @submit.prevent="handleSubmit">
                <h2 class="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                  Sign In
                </h2>

                
                <!--
                <div class="mt-2 text-center intro-x text-slate-400 xl:hidden">
                  A few more clicks to sign in to your account. Manage all your
                  e-commerce accounts in one place
                </div>
                -->

              <div class="mt-8 intro-x">
                <input
                  type="text"
                  class="block px-4 py-3 intro-x login__input form-control"
                  :placeholder="$t('login.placeholderEmail')"
                  v-model.trim="userData.email"/>
                <input
                  type="password"
                  class="block px-4 py-3 mt-4 intro-x login__input form-control"
                  :placeholder="$t('login.placeholderPassword')"
                  autocomplete="on"
                  v-model.trim="userData.password"/>
              </div>

              <div class="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                <div class="flex items-center mr-auto">
                  <input
                    id="remember-me"
                    type="checkbox"
                    class="mr-2 border form-check-input"/>
                  <label class="cursor-pointer select-none" for="remember-me">Remember me</label>
                </div>
                <a href="">{{ $t('login.forgot') }}</a>
              </div>

              <div class="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                <button class="w-full px-4 py-3 align-top btn btn-primary xl:w-32 xl:mr-3">
                  Login
                </button>
                <!--
                <button class="w-full px-4 py-3 mt-3 align-top btn btn-outline-secondary xl:w-32 xl:mt-0">
                  Register
                </button>
                -->
              </div>

              <!--
              <div class="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left">
                By signin up, you agree to our
                <a class="text-primary dark:text-slate-200" href="">Terms and Conditions</a>
                &
                <a class="text-primary dark:text-slate-200" href="">Privacy Policy</a>
              </div>
              -->

              </form>
            </div>
          </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from "vue";
  // import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
  import dom from "@left4code/tw-starter/dist/js/dom";

  //import {useUserStore} from '@/stores/leader/user';
  //import { ref } from 'vue';

  //const userStore = useUserStore();
  //email = ref('');
  //const password = ref('');

  import { reactive } from "vue";
  //import { useRouter } from "vue-router";

  import { useAuthStore } from "@/stores/leader/auth";
    
  const userData = reactive({
    email:"",
    password:"",
  });

  //const router = useRouter();
  const { loginUser } = useAuthStore();

  const handleSubmit = async () => {
    await loginUser(userData);

    /*
    await router.push({
      name: "side-menu-dashboard-overview-1",
    })
    */
  }

  /*
  const handleSubmit = () => {
    userStore.loginUser(email.value, password.value);
  }
  */
  
  onMounted(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  });
</script>
