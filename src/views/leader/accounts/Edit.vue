<script>
    export default {
      name: "AccountsEditView"
    }
</script>

<script setup>
  import { ref, watch } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  
  import { useAccountsStore } from "../../../stores/leader/accounts";
  import AccountsForm from "../../../components/leader/accounts/Form.vue";
  
  const route = useRoute();
  const show_form = ref(false);
  const { updateAccount, fetchAccount } = useAccountsStore();
  const { account: form_data } = storeToRefs(useAccountsStore());
  
  fetchAccount(route.params.id);
  
  watch(
    () => form_data.value,
    () => {
      show_form.value = true;
    }
  );
  
  const submit = async () => {
    await updateAccount();
  }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('accounts.title') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/accounts`">{{ $t('accounts.buttons.prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <AccountsForm
        v-if="show_form"
        @submit="submit"
        :account="form_data"
        text-button="Actualizar" />
    </div>
  </div>
</template>