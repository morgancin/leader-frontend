<script>
  export default {
    name: "UsersCreateView"
  }
  </script>
  
  <script setup>
      //import { useRouter } from "vue-router";
      //import { storeToRefs } from "pinia";
      //import { useCoursesStore } from "../../stores/courses";
      //import CourseForm from "../../components/Courses/Form.vue";
  
      //const router = useRouter();
      //const { loading, error } = storeToRefs(useCoursesStore());
      //const { createCourse } = useCoursesStore();
  
      //import { useUsersStore } from "../../stores/leader/users";

      import {
    required,
    minLength,
    // maxLength,
    email,
    // url,
    // integer,
  } from "@vuelidate/validators";
  import { useVuelidate } from "@vuelidate/core";
  import Toastify from "toastify-js";
  import dom from "@left4code/tw-starter/dist/js/dom";


  
      import { reactive } from "vue";
      import { storeToRefs } from "pinia";
      import { useUsersStore } from "../../../stores/leader/users";
      import UserForm from "../../../components/leader/users/Form.vue";
  
      const { message } = storeToRefs(useUsersStore());
  
      const { createUser } = useUsersStore();
  
      // const formData = reactive({
      //     name:"",
      //     email:"",
      //     password:"",
      //     password_confirmation:"",
      //     role:"leader",
      // });
  
      const formData = reactive({
          name:"",
          email:"",
          password:"",
          password_confirmation:"",
          role:"leader",
      });

      // const rules = {
      //   name: {
      //     required,
      //     // minLength: minLength(2),
      //   },
      //   email: {
      //     required,
      //     email,
      //   },
      //   password: {
      //     required,
      //     minLength: minLength(6),
      //   },
      //   password_confirmation: {
      //     required,
      //     minLength: minLength(6),
      //     // sameAs: sameAs(formData.password)
      //   }
      // };

      const submit = async () => {
          await createUser(formData);
      // const result = await v$.value.$validate()
      // if(result){
      //   alert('success, form submitted!');
      // } else {
      //   alert('error, form submitted!');
      // }
      //     /*
      //     if ( ! error.value) {
      //         await router.push({
      //         name: "courses",
      //         })
      //     }
      //     */
      }

      // const v$ = useVuelidate(rules, formData);
  
  // const save = async () => {
         
  //   v$.value.$touch();
  //   if (v$.value.$invalid) {
  //     Toastify({
  //       node: dom("#failed-notification-content")
  //         .clone()
  //         .removeClass("hidden")[0],
  //       duration: 3000,
  //       newWindow: true,
  //       close: true,
  //       gravity: "top",
  //       position: "right",
  //       stopOnFocus: true,
  //     }).showToast();
  //   } else {
  //     Toastify({
  //       node: dom("#success-notification-content")
  //         .clone()
  //         .removeClass("hidden")[0],
  //       duration: 3000,
  //       newWindow: true,
  //       close: true,
  //       gravity: "top",
  //       position: "right",
  //       stopOnFocus: true,
  //     }).showToast();
  //   }
  // };
  </script>
  
  <template>
      <div class="intro-y flex items-center mt-8">
          <h2 class="text-lg font-medium mr-auto">{{ $t('add_user.add_user') }}</h2>
      </div>
      
      <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/dashboard-user`">{{ $t('add_user.btn_prev') }}</router-link>
      <div class="grid grid-cols-1 gap-3 mt-5">
          <p v-if="message">{{ message.value }}</p>
          <UserForm
              :user="formData"
              @submit="submit"
          />
          <!-- <UserForm
              :user="form"
              @submit="submit"
          /> -->
      </div>
  </template>
  
  
  <!--
      <script setup>
  import { reactive } from "vue";
  import { useRouter } from "vue-router";
  import { storeToRefs } from "pinia";
  import { useCoursesStore } from "../../stores/courses";
  import CourseForm from "../../components/Courses/Form.vue";
  
  const router = useRouter();
  const { loading, error } = storeToRefs(useCoursesStore());
  const { createCourse } = useCoursesStore();
  
  const form = reactive({
    title: "",
    author: "",
    summary: "",
    description: "",
  });
  
  const submit = async () => {
    await createCourse(form);
    if ( ! error.value) {
      await router.push({
        name: "courses",
      })
    }
  }
  </script>
  
  <template>
    <div>
      <h1>Crear un nuevo curso</h1>
      <p v-if="loading">Procesando curso...</p>
      <p v-if="error">{{ error.message }}</p>
      <CourseForm
          :course="form"
          @submit="submit"
      />
    </div>
  </template>
  --> 
  