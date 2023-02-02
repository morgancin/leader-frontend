<script>
    export default {
        name: "UsersEditView"
    }
</script>

<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useUsersStore } from "../../../stores/leader/users";
import UserForm from "../../../components/leader/users/Form.vue";

const route = useRoute();
const { updateUser, fetchUser } = useUsersStore();
const { user: form, message } = storeToRefs(useUsersStore());

fetchUser(route.params.id);

const submit = async () => {
  await updateUser(form.value);
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
        <h2 class="text-lg font-medium mr-auto">Update User</h2>
    </div>
    
    <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/dashboard-user`">Prev</router-link>
    <div class="grid grid-cols-3 gap-3 mt-5">
        <p v-if="message">{{ message }}</p>
        <UserForm
            text-button="Actualizar"
            :user="form"
            @submit="submit"
        />
    </div>
</template>


<!--
<script setup>
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useCoursesStore } from "../../stores/courses";
import CourseForm from "../../components/Courses/Form.vue";

const router = useRouter();
const route = useRoute();
const { updateCourse, fetchCourse } = useCoursesStore();
const { course: form, loading, error } = storeToRefs(useCoursesStore());

fetchCourse(route.params.id);

const submit = async () => {
  await updateCourse(form.value);
  if ( ! error.value) {
    await router.push({
      name: "courses",
    })
  }
}
</script>

<template>
  <div>
    <h1>Actualizar un curso</h1>
    <p v-if="loading">Procesando curso...</p>
    <p v-if="error">{{ error.message }}</p>
    <CourseForm
        text-button="Actualizar"
        :course="form"
        @submit="submit"
    />
  </div>
</template>
-->
