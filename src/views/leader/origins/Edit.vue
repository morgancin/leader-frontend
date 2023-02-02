<script>
    export default {
      name: "ClientsOriginsEditView"
    }
</script>

<script setup>
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";

    import { useClientOriginStore } from "@/stores/leader/client-origin";
    import ClientOriginForm from "../../../components/leader/clientOrigin/Form.vue";

    const route = useRoute();
    const { updateClientOrigin, fetchClientOrigin } = useClientOriginStore();
    const { origin: form, message } = storeToRefs(useClientOriginStore());
    
    fetchClientOrigin(route.params.id);
    
    const submit = async () => {
        await updateClientOrigin();
    }
</script>
<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_catalog_origin.origins') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/origin`">{{ $t('add_catalog_origin.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <ClientOriginForm
          text-button="Actualizar"
          :origin="form" 
          @submit="submit" />
    </div>
  </div>
</template>