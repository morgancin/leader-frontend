<script>
    export default {
      name: "OriginsMediumsCreateView"
    }
</script>

<script setup>
    import { reactive } from "vue";
    import { useClientOriginMediumStore } from "@/stores/leader/client-origin-medium";
    import ClientOriginMediumForm from "@/components/leader/clientOriginMedium/Form.vue";
    
    const { createClientOriginMedium } = useClientOriginMediumStore();
  
    const form = reactive({
                      description: "",
                      parent_id_client_medium: '',
                  });

    const submit = async () => {
      await createClientOriginMedium(form);
    }
</script>
  
<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">{{ $t('add_origin_medium.origin_medium') }}</h2>
    <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/medium`">{{ $t('add_origin_medium.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <ClientOriginMediumForm
            :medium="form"
            @submit="submit"/>
      <!-- END: Form Layout -->
    </div>
  </div>
</template>