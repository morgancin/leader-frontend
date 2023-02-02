<script>
    export default {
      name: "OriginsMediumsEditView"
    }
</script>

<script setup>
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";

    import { useClientOriginMediumStore } from "@/stores/leader/client-origin-medium";
    import ClientOriginMediumForm from "@/components/leader/clientOriginMedium/Form.vue";
    
    const route = useRoute();
    const { updateClientOriginMedium, fetchClientOriginMedium } = useClientOriginMediumStore();
    const { medium: form, message } = storeToRefs(useClientOriginMediumStore());
    
    fetchClientOriginMedium(route.params.id);
    
    const submit = async () => {
        await updateClientOriginMedium();
    }
</script>
<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_origin_medium.origin_medium') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/origin`">{{ $t('add_origin_medium.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <ClientOriginMediumForm
          text-button="Actualizar"
          :medium="form" 
          @submit="submit" />
    </div>
  </div>
</template>