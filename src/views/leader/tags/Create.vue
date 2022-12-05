<script>
    export default {
      name: "TagsCreateView"
    }
</script>

<script setup>
    import { reactive } from "vue";
    import { useTagsStore } from "@/stores/leader/tags";
    import TagsForm from "@/components/leader/tags/Form.vue";
    
    const { createTags } = useTagsStore();
    
    const form = reactive({
                    name:'',
                    type:'',
                });
  
    const submit = async () => {
      await createTags(form);
    }
</script>
  
<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">{{ $t('add_tags.tags') }}</h2>
    <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/tags`">{{ $t('add_tags.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <TagsForm
            :tag="form"
            @submit="submit"/>
      <!-- END: Form Layout -->
    </div>
  </div>
</template>