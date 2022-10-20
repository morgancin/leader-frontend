<script setup>
  import { reactive } from "vue";
  import { useTagsStore } from "@/stores/leader/tags";
  import TagsForm from "@/components/leader/tags/Form.vue"
  
  
  const { createTags } = useTagsStore();
  
  const form = reactive({
        name:"",
        type: "tag"
  });
  
  const submit = async () => {
    await createTags(form);
  }
  </script>
  
<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Etiquetas</h2>
    <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/tags`">Anterior
    </router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="intro-y col-span-12 lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <TagsForm
            :tag="form"
            @submit="submit"/>
      <!-- END: Form Layout -->
    </div>
  </div>
</template>