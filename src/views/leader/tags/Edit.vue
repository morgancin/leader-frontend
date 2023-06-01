<script>
    export default {
      name: "TagsEditView"
    }
</script>

<script setup>
  import { ref, watch } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  
  import TagsForm from "@/components/leader/tags/Form.vue";
  import { useTagsStore } from "@/stores/leader/tags";
  
  const route = useRoute();
  const show_form = ref(false);
  const { updateTag, fetchTag } = useTagsStore();
  const { tag: form_data } = storeToRefs(useTagsStore());
  
  fetchTag(route.params.id);

  watch(
    () => form_data.value,
    () => {
      show_form.value = true;
    }
  );
  
  const submit = async () => {
    await updateTag();
  }
</script>
<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_tags.tags') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/tags`">{{ $t('add_tags.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <TagsForm
        v-if="show_form"
        @submit="submit"
        :tag="form_data"
        text-button="Actualizar" />
    </div>
  </div>
</template>