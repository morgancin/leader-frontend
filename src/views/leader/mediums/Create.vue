<script setup>
  import { reactive } from "vue";
  import { useClientOriginMediumStore } from "@/stores/leader/client-origin-medium";
  import ClientOriginMediumForm from "@/components/leader/clientOriginMedium/Form.vue"
  
  
  const { createClientOriginMedium } = useClientOriginMediumStore();
  
  const form = reactive({
        description: "",
        parent_id_client_medium: "1"
  });
  
  const submit = async () => {
    await createClientOriginMedium(form);
  }
  </script>
  
<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Medium</h2>
    <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/medium`">{{ $t('add_catalog_activity.btn_prev') }}
    </router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="intro-y col-span-12 lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <ClientOriginMediumForm
            :medium="form"
            @submit="submit"/>
      <!-- END: Form Layout -->
    </div>
  </div>
</template>