<script>
  export default {
    name: "AccountsCreateView"
  }
</script>

<script setup>
  import { ref, reactive } from 'vue';
  import { storeToRefs } from "pinia";

  import AccountsForm from "../../../components/leader/accounts/Form.vue";
  
  import { useAccountsStore } from "../../../stores/leader/accounts";

  const { createAccount } = useAccountsStore();
  
  const form = reactive({
                        name:''
                      });

  const submit = async () => {
    await createAccount(form);
  }
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
      <h2 class="mr-auto text-lg font-medium">{{ $t('add_accounts.accounts') }}</h2>
      <router-link class="w-20 mr-2 shadow-md btn btn-primary" :to="`/accounts`">{{ $t('add_accounts.btn_prev') }}</router-link>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <div class="col-span-12 intro-y lg:col-span-6">
      <AccountsForm
        :account="form"
        @submit="submit" />
    </div>
  </div>
</template>