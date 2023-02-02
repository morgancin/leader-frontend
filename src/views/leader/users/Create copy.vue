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

    import { reactive } from "vue";
    import { storeToRefs } from "pinia";
    import { useUsersStore } from "../../../stores/leader/users";
    import UserForm from "../../../components/leader/users/Form.vue";

    const { message } = storeToRefs(useUsersStore());

    const { createUser } = useUsersStore();

    const form = reactive({
        name:"",
        email:"",
        password:"",
        password_confirmation:"",
        role:"leader",
    });

    const submit = async () => {
        await createUser(form);
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
    <div class="intro-y flex items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">{{ $t('add_user.add_user') }}</h2>
    </div>
    
    <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/dashboard-user`">{{ $t('add_user.btn_prev') }}</router-link>
    <div class="grid grid-cols-1 gap-3 mt-5">
        <p v-if="message">{{ message.value }}</p>
        <UserForm
            :user="form"
            @submit="submit"
        />
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
