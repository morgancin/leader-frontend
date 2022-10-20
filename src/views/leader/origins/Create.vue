<script setup>
  import { reactive } from "vue";
  import { useClientOriginStore } from "@/stores/leader/client-origin";
  import ClientOriginForm from "../../../components/leader/clientOrigin/Form.vue"
  
  
  const { createClientOrigin } = useClientOriginStore();
  
  const form = reactive({
        description: ""
  });
  
  const submit = async () => {
    await createClientOrigin(form);
  }
  </script>
  
<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">{{ $t('add_catalog_origin.origin_type') }}</h2>
    <router-link class="btn btn-primary shadow-md w-20 mr-2" :to="`/origin`">{{ $t('add_catalog_activity.btn_prev') }}
    </router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="intro-y col-span-12 lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <ClientOriginForm
            :origin="form"
            @submit="submit"/>
      <!-- END: Form Layout -->
    </div>
  </div>
</template>