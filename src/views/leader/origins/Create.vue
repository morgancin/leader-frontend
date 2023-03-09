<script>
    export default {
      name: "ClientsOriginsCreateView"
    }
</script>

<script setup>
  import { reactive } from "vue";
  import { useClientOriginStore } from "@/stores/leader/client-origin";
  import ClientOriginForm from "../../../components/leader/clientOrigin/Form.vue";
  
  const { createClientOrigin } = useClientOriginStore();
  
  const form = reactive({
                        description:'',
                        account_id:null,
                    });
  
  const submit = async () => {
    await createClientOrigin(form);
  }
</script>
  
<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">{{ $t('add_catalog_origin.origins') }}</h2>
    <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/origin`">{{ $t('add_catalog_origin.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <ClientOriginForm
            :source="form"
            @submit="submit"/>
      <!-- END: Form Layout -->
    </div>
  </div>
</template>