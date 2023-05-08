<script>
    export default {
        name: "PriceListsForm",
    }
</script>

<script setup>
  import { onMounted } from 'vue';
  import { storeToRefs } from "pinia";

  import vSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';
  
  import { useAccountsStore } from "@/stores/leader/accounts";

  const { fetchAccounts } = useAccountsStore();
  const { accounts: dataAccounts } = storeToRefs(useAccountsStore());

  defineProps({
    price_list: {
      type: Object,
      required: true,
    },
  })
  
  defineEmits(["submit"]);

  onMounted(async() => {
    await fetchAccounts();
  });
</script>

<template>
  <div class="col-span-12 intro-y lg:col-span-6">

    <!-- BEGIN: Form Layout -->
    <form @submit.prevent="$emit('submit')" autocomplete="on">

      <div class="p-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <ChevronDownIcon class="w-4 h-4 mr-2" /> {{ $t('add_price_lists.price_lists') }}
          </div>
          
          <div class="mt-5">
            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
              <div class="form-label xl:w-72 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">{{ $t('add_price_lists.price_lists_account') }}</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      {{ $t('forms.required') }}
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Cuenta a quien pertenece
                  </div>
                </div>
              </div>
              
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <v-select
                  label="name"
                  class="w-full form-control"
                  :options="dataAccounts"
                  v-model="price_list.account_id"
                  :reduce="name => name.id">
                </v-select>
                <!-- :class="{ 'border-danger': validate.account_id.$error }" -->                
              </div>
            </div>
          </div>

          <div class="mt-5">
            <div class="flex-col items-start pt-5 mt-5 form-inline xl:flex-row first:mt-0 first:pt-0">
              <div class="form-label xl:w-72 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">{{ $t('add_price_lists.price_lists_name') }}</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      {{ $t('forms.required') }}
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Nombre de la lista de precios
                  </div>
                </div>
              </div>
              
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <input
                  type="text"
                  class="w-full form-control"
                  :placeholder="$t('add_price_lists.price_lists_name')"
                  v-model="price_list.name" />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <button type="button" class="w-full py-3 mr-1 md:w-52 btn btn-outline-secondary">{{ $t('add_price_lists.btn_cancel') }}</button>
        <button type="submit" class="w-full py-3 btn btn-primary md:w-52">{{ $t('add_price_lists.btn_save') }}</button>
      </div>

    </form>
  </div>
</template>